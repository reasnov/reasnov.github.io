import { describe, it, expect, vi } from "vitest";
import { generatePersonSchema, generateBlogPostingSchema } from "./SEO";

vi.mock("./Config", () => ({
    config: vi.fn((key, defaults) => {
        const mockConfig: Record<string, any> = {
            "settings.site_name": "Test Site",
            "settings.site_url": "https://test.com",
            "settings.job_title": "Developer",
            "settings.social_links": ["https://github.com/test"]
        };
        return mockConfig[key] ?? defaults;
    })
}));

describe("SEO Utility", () => {
	describe("generatePersonSchema()", () => {
		it("should generate a valid Person schema", () => {
			const schema = generatePersonSchema();
			expect(schema["@type"]).toBe("Person");
			expect(schema.name).toBe("Test Site");
			expect(schema.url).toBe("https://test.com");
			expect(schema.jobTitle).toBe("Developer");
		});
	});

	describe("generateBlogPostingSchema()", () => {
		it("should generate a valid BlogPosting schema", () => {
			const post = {
				title: "Post Title",
				description: "Post Desc",
				pubDate: new Date("2025-01-01"),
				url: "https://test.com/post",
				heroImage: "/image.jpg"
			};
			const schema = generateBlogPostingSchema(post);
			expect(schema["@type"]).toBe("BlogPosting");
			expect(schema.headline).toBe(post.title);
			expect(schema.datePublished).toBe(post.pubDate.toISOString());
			expect(schema.author.name).toBe("Test Site");
			expect(schema.image).toBe("https://test.com/image.jpg");
		});
	});
});
