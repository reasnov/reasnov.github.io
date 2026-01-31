import { describe, it, expect } from "vitest";
import { ContentService } from "./Content";

describe("ContentService", () => {
	describe("getReadingTime", () => {
		it("should return 1 minute for a short text", () => {
			const text = "Hello world this is a test.";
			const time = ContentService.getReadingTime(text);
			expect(time).toBe(1);
		});

		it("should return 2 minutes for content with 300 words (at 200 wpm)", () => {
			const text = "word ".repeat(300);
			const time = ContentService.getReadingTime(text);
			expect(time).toBe(2);
		});

		it("should handle empty content", () => {
			const time = ContentService.getReadingTime("");
			expect(time).toBe(0);
		});
        
        it("should respect custom words per minute", () => {
			const text = "word ".repeat(100);
			const time = ContentService.getReadingTime(text, 50);
			expect(time).toBe(2);
		});
	});
});
