import { config } from "@helpers/Config";
import fs from "fs";
import path from "path";

const translationsCache: Record<string, Record<string, any>> = {};

/**
 * Loads translation data for a given locale from a JSON file.
 * Caches translations to avoid redundant file reads. In development, caching is
 * bypassed to allow for real-time changes without server restarts.
 *
 * @param locale The locale to load translations for (e.g., 'en').
 * @param file The specific translation file to load within the locale directory (e.g., 'messages' for messages.json).
 * @returns A record containing the translation keys and their corresponding translated strings.
 */
function loadTranslations(locale: string, file: string): Record<string, any> {
	const cacheKey = `${locale}:${file}`;
	// In development, don't cache to see changes without restarting.
	if (config("app.env") !== "production" || !translationsCache[cacheKey]) {
		try {
			const langPath = path.join(process.cwd(), "lang", locale, `${file}.json`);

			if (!fs.existsSync(langPath)) {
				console.warn(`Translation file not found for locale "${locale}" at ${langPath}`);
				translationsCache[cacheKey] = {};
			} else {
				const langFile = fs.readFileSync(langPath, "utf-8");
				translationsCache[cacheKey] = JSON.parse(langFile) || {};
			}
		} catch (error) {
			console.error(`Error loading or parsing translation file for locale "${locale}":`, error);
			translationsCache[cacheKey] = {};
		}
	}
	return translationsCache[cacheKey];
}

/**
 * Translates a given key into the specified locale, optionally replacing placeholders.
 * The translation file is automatically determined from the key (e.g., 'messages.hello_world' uses 'messages.json').
 * If the key is not found, the key itself is returned.
 *
 * @param key The translation key (e.g., 'welcome', 'user.name', 'messages.welcome').
 * @param replace An object containing key-value pairs for placeholder replacement (e.g., `{ name: 'John' }`).
 * @param locale The target locale for the translation (defaults to 'en').
 * @returns The translated string with placeholders replaced, or the original key if no translation is found.
 */
export function trans(
	key: string,
	replace: Record<string, string | number> = {},
	locale: string = config("app.locale", "en")
): string {
	let actualKey = key;
	let fileName = locale; // Default to locale if no file prefix in key

	const keyParts = key.split(".");
	// If key contains a dot and the first part is not the locale itself, use it as filename
	if (
		keyParts.length > 1 &&
		keyParts[0] !== locale &&
		fs.existsSync(path.join(process.cwd(), "lang", locale, `${keyParts[0]}.json`))
	) {
		fileName = keyParts[0];
		actualKey = keyParts.slice(1).join(".");
	}

	const lang = loadTranslations(locale, fileName);

	const translation = actualKey.split(".").reduce((obj, i) => (obj ? obj[i] : undefined), lang);

	if (translation === undefined) {
		console.warn(`Translation key "${key}" not found for locale "${locale}" in file "${fileName}.json".`);
		return key;
	}

	let result = String(translation);

	for (const placeholder in replace) {
		if (Object.prototype.hasOwnProperty.call(replace, placeholder)) {
			const value = replace[placeholder];
			const regex = new RegExp(`{${placeholder}}`, "g");
			result = result.replace(regex, String(value));
		}
	}

	return result;
}
