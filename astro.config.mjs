// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@config": fileURLToPath(new URL("./config", import.meta.url)),
			},
		},
	},

	integrations: [svelte()],
});
