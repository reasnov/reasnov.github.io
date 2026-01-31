import { describe, it, expect, vi } from "vitest";
import { trans } from "./Translator";

// Mocking fs to avoid real file system interaction if desired,
// but for integration-like tests, real files are okay.
// Here we might need to mock config as well since trans uses it.

vi.mock("./Config", () => ({
    config: vi.fn((key, defaults) => {
        if (key === "app.locale") return "en";
        return defaults;
    })
}));

describe("Translator Utility", () => {
	it("should translate a key correctly for the default locale", () => {
		// This assumes locales/en/en.json exists and has "welcome" key
		const result = trans("welcome", {}, "en");
		expect(result).toBe("welcome");
	});

	it("should translate with placeholders", () => {
		// Assuming "blog.reading_time": "{{minutes}} min read"
		const result = trans("blog.reading_time", { minutes: 5 }, "en");
		expect(result).toBe("5 min read");
	});

	it("should switch to the requested locale", () => {
		const result = trans("welcome", {}, "id");
		expect(result).toBe("selamat datang");
	});

	it("should return the key if the translation is missing", () => {
		const result = trans("non.existent.key", {}, "en");
		expect(result).toBe("non.existent.key");
	});
});
