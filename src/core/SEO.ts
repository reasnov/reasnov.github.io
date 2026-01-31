import { config } from "./Config";

/**
 * Interface for blog posting data.
 */
export interface BlogPostingData {
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	url: string;
	heroImage?: string;
}

/**
 * Generates JSON-LD structured data for a Person (Profile).
 *
 * @returns JSON-LD Person object.
 */
export function generatePersonSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: config("settings.site_name"),
		url: config("settings.site_url"),
		jobTitle: config("settings.job_title"),
		sameAs: config("settings.social_links", []),
	};
}

/**
 * Generates JSON-LD structured data for a Blog Posting.
 *
 * @param post The blog post data.
 * @returns JSON-LD BlogPosting object.
 */
export function generateBlogPostingSchema(post: BlogPostingData) {
	const siteUrl = config("settings.site_url");

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.pubDate.toISOString(),
		dateModified: post.updatedDate?.toISOString() || post.pubDate.toISOString(),
		author: {
			"@type": "Person",
			name: config("settings.site_name"),
		},
		url: post.url,
		image: post.heroImage ? new URL(post.heroImage, siteUrl).toString() : undefined,
	};
}
