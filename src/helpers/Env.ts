export function env(key: string, defaults: any = null) {
	return process.env[key] || defaults;
}
