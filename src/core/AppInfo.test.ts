import { describe, it, expect } from "vitest";
import { app_info } from "./AppInfo";

describe("AppInfo Utility", () => {
	it("should retrieve app version", () => {
		const version = app_info("app.version");
		expect(version).toBeDefined();
		expect(typeof version).toBe("string");
	});

	it("should retrieve author handle", () => {
		const handle = app_info("author.handle");
		expect(handle).toBe("@reasnov");
	});

	it("should return default value for non-existent keys", () => {
		const result = app_info("non.existent.key", "default");
		expect(result).toBe("default");
	});

	it("should handle empty keys", () => {
		const result = app_info("", "default");
		expect(result).toBe("default");
	});
});
