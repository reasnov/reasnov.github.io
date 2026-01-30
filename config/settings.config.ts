import { config } from "../src/core/Config";

const appName = config("app.name", "Reas Vyn");

export default {
	site_name: appName,
	site_title: appName + " | Fullstack Web Developer",
};
