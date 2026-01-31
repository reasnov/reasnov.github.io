/**
 * Content utility service for processing blog and page content.
 */
export class ContentService {
    /**
     * Calculates the estimated reading time for a given text.
     * @param content The text content to analyze.
     * @param wordsPerMinute Average words read per minute (default 200).
     * @returns Estimated reading time in minutes.
     */
    static getReadingTime(content: string, wordsPerMinute: number = 200): number {
        const trimmed = content.trim();
        if (trimmed.length === 0) return 0;
        const words = trimmed.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }
}
