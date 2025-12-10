import { env } from "@helpers/Env";

export default {
	name: env("APP_NAME", "Reas Vyn"),
	locale: env("APP_LOCALE", "en"),
	env: env("NODE_ENV", "production"),
};
