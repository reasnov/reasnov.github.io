/**
 * SEO utility service for generating meta tags and structured data.
 */
export class SEOService {
    /**
     * Generates JSON-LD structured data for a Person (Profile).
     */
    static generatePersonSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Reas Vyn",
            "url": "https://reasnov.github.io",
            "jobTitle": "Fullstack Web Developer",
            "sameAs": [
                "https://github.com/reasnov",
                "https://linkedin.com/in/reasnov"
            ]
        };
    }

    /**
     * Generates JSON-LD structured data for a Blog Posting.
     */
    static generateBlogPostingSchema(post: { 
        title: string; 
        description: string; 
        pubDate: Date; 
        updatedDate?: Date;
        url: string;
        heroImage?: string;
    }) {
        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.pubDate.toISOString(),
            "dateModified": post.updatedDate?.toISOString() || post.pubDate.toISOString(),
            "author": {
                "@type": "Person",
                "name": "Reas Vyn"
            },
            "url": post.url,
            "image": post.heroImage ? new URL(post.heroImage, "https://reasnov.github.io").toString() : undefined
        };
    }
}
