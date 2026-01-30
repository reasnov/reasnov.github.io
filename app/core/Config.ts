export function config(key: string, defaults: any = null): any {
	try {
		const keyParts = key.split(".");
		const fileName = keyParts.shift();

		if (!fileName) {
			return defaults;
		}

		// Using import.meta.glob for dynamic import, specific to Vite which Astro uses.
		const configModules = import.meta.glob("/config/*.ts", { eager: true });
		const modulePath = `/config/${fileName}.config.ts`;

		const configModule = configModules[modulePath];

		if (!configModule) {
			return defaults;
		}

		const configData = (configModule as any).default;

		let value = configData;
		for (const part of keyParts) {
			if (value && typeof value === "object" && part in value) {
				value = value[part];
			} else {
				return defaults;
			}
		}

		return value ?? defaults;
	} catch (e) {
		return defaults;
	}
}
