import { env } from "../src/core/Env";

export default {
	name: env("APP_NAME", "Reas Vyn"),
	author: env("APP_AUTHOR", "Reas Vyn"),
	locale: env("APP_LOCALE", "en"),
	env: env("NODE_ENV", "production"),
};
