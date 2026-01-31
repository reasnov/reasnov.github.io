/**
 * Helper to get all configuration modules.
 * In a Vite environment, this uses import.meta.glob.
 */
function getConfigModules(): Record<string, any> {
	try {
		return import.meta.glob("/config/*.ts", { eager: true });
	} catch (e) {
		return {};
	}
}

/**
 * Access configuration values using dot notation (e.g., 'app.name').
 * 
 * @param key The configuration key.
 * @param defaults The default value if the key is not found.
 * @returns The configuration value or the default value.
 */
export function config<T = any>(key: string, defaults: T | null = null): T {
	try {
		const keyParts = key.split(".");
		const fileName = keyParts.shift();

		if (!fileName) {
			return defaults as T;
		}

		const configModules = getConfigModules();
		const modulePath = `/config/${fileName}.config.ts`;
		const configModule = configModules[modulePath];

		if (!configModule) {
			return defaults as T;
		}

		const configData = (configModule as any).default;

		let value = configData;
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
