import { env } from "../app/core/Env";

export default {
	name: env("APP_NAME", "Reas Vyn"),
	locale: env("APP_LOCALE", "en"),
	env: env("NODE_ENV", "production"),
};
