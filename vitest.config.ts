import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		include: ["src/**/*.{test,spec}.{js,ts}"],
	},
	resolve: {
		alias: {
			"@core": fileURLToPath(new URL("./src/core", import.meta.url)),
			"@config": fileURLToPath(new URL("./config", import.meta.url)),
			"@data": fileURLToPath(new URL("./src/data", import.meta.url)),
		},
	},
});
