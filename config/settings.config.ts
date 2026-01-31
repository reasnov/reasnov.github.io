import { config } from "../src/core/Config";

const appName = config("app.name", "Reas Vyn");

export default {
	site_name: appName,
	site_title: appName + " | Fullstack Web Developer",
	site_url: "https://reasnov.github.io",
	job_title: "Fullstack Web Developer",
	social_links: ["https://github.com/reasnov", "https://linkedin.com/in/reasnov", "https://x.com/reasnov"],
};
