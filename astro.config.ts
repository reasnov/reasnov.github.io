// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
	site: "https://reasnov.github.io",
	base: "/",
	trailingSlash: "always",
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@config": fileURLToPath(new URL("./config", import.meta.url)),
			},
		},
	},

	i18n: {
		defaultLocale: "en",
		locales: ["en", "id"],
		routing: {
			prefixDefaultLocale: true,
			fallbackType: "redirect",
		},
	},
});
