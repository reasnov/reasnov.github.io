import appInfoData from "../../app_info.json";

/**
 * Access application metadata from app_info.json using dot notation.
 * 
 * @param key The metadata key (e.g., 'app.version', 'author.name').
 * @param defaults The default value if the key is not found.
 * @returns The metadata value or the default value.
 */
export function app_info<T = any>(key: string, defaults: T | null = null): T {
	try {
		const keyParts = key.split(".");
		let value: any = appInfoData;

		for (const part of keyParts) {
			if (value && typeof value === "object" && part in value) {
				value = value[part];
			} else {
				return defaults as T;
			}
		}

		return (value ?? defaults) as T;
	} catch (e) {
		return defaults as T;
	}
}
