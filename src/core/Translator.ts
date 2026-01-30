import i18next from "i18next";
import fs from "fs";
import path from "path";
import { config } from "./Config";

const DEFAULT_LOCALE = config("app.locale", "en");

/**
 * Loads all translation files (namespaces) for a given locale.
 */
function loadResources(locale: string) {
	const langDir = path.join(process.cwd(), "lang", locale);
	if (!fs.existsSync(langDir)) return {};

	const resources: Record<string, any> = {};
	try {
		const files = fs.readdirSync(langDir);
		files.forEach((file) => {
			if (file.endsWith(".json")) {
				const ns = path.basename(file, ".json");
				const content = JSON.parse(fs.readFileSync(path.join(langDir, file), "utf-8"));
				resources[ns] = content;
			}
		});
	} catch (error) {
		console.error(`Error loading resources for locale "${locale}":`, error);
	}
	return resources;
}

// Initialize i18next synchronously
if (!i18next.isInitialized) {
	i18next.init({
		lng: DEFAULT_LOCALE,
		fallbackLng: "en",
		ns: [DEFAULT_LOCALE], // default namespace matches the locale name (e.g., 'en.json' -> 'en')
		defaultNS: DEFAULT_LOCALE,
		resources: {
			[DEFAULT_LOCALE]: loadResources(DEFAULT_LOCALE),
		},
		initImmediate: false, // Ensure synchronous initialization
		interpolation: {
			escapeValue: false, // Astro/Svelte handles escaping
		},
	});
}

/**
 * Translates a given key into the specified locale, supporting placeholders.
 * Uses i18next under the hood.
 *
 * @param key The translation key (e.g., 'welcome', 'messages.hello').
 * @param replace An object containing key-value pairs for placeholder replacement.
 * @param locale The target locale (defaults to app config).
 * @returns The translated string.
 */
export function trans(
	key: string,
	replace: Record<string, string | number> = {},
	locale: string = config("app.locale", "en")
): string {
	// Ensure resources for the requested locale are loaded
	if (!i18next.hasResourceBundle(locale, locale)) { // Check if the default ns for this locale exists
		const resources = loadResources(locale);
		Object.keys(resources).forEach((ns) => {
			i18next.addResourceBundle(locale, ns, resources[ns], true, true);
		});
	}

	return i18next.t(key, { ...replace, lng: locale });
}
