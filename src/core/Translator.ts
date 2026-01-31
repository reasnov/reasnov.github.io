import i18next from "i18next";
import fs from "fs";
import path from "path";
import { config } from "./Config";

const DEFAULT_LOCALE = config("app.locale", "en");

/**
 * Loads all translation files (namespaces) for a given locale.
 */
function loadResources(locale: string) {
	const localesDir = path.join(process.cwd(), "locales", locale);
	if (!fs.existsSync(localesDir)) return {};

	const resources: Record<string, any> = {};
	try {
		const files = fs.readdirSync(localesDir);
		files.forEach((file) => {
			if (file.endsWith(".json")) {
				const ns = path.basename(file, ".json");
				const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), "utf-8"));
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
		defaultNS: "translations",
		resources: {
			[DEFAULT_LOCALE]: {
				translations: loadResources(DEFAULT_LOCALE)[DEFAULT_LOCALE] || {}
			},
		},
		initImmediate: false,
		interpolation: {
			escapeValue: false,
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
	if (!i18next.hasResourceBundle(locale, "translations")) {
		const resources = loadResources(locale);
		const combinedResources = Object.values(resources).reduce((acc, curr) => ({ ...acc, ...curr }), {});
		i18next.addResourceBundle(locale, "translations", combinedResources, true, true);
	}

	return i18next.t(key, { ...replace, lng: locale });
}
