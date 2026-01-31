/**
 * Utility for accessing environment variables with optional defaults.
 * 
 * @param key The environment variable key.
 * @param defaults The default value if the key is not found.
 * @returns The value of the environment variable or the default value.
 */
export function env<T = string>(key: string, defaults: T | null = null): T {
	const value = process.env[key] || import.meta.env[key];
	return (value as unknown as T) ?? (defaults as T);
}
