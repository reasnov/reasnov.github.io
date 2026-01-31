// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
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

	integrations: [svelte()],

	i18n: {
		defaultLocale: "en",
		locales: ["en", "id"],
		routing: {
			prefixDefaultLocale: true,
			fallbackType: "redirect",
		},
	},
});
