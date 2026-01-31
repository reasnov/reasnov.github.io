import { describe, it, expect, vi, beforeEach } from "vitest";
import { env } from "./Env";

describe("Env Utility", () => {
	beforeEach(() => {
		vi.stubGlobal("process", {
			env: {
				EXISTING_KEY: "some-value",
			},
		});

		// Also mock import.meta.env if possible,
		// but since we are in Vitest, process.env is usually sufficient.
	});

	it("should return the value of an existing environment variable", () => {
		expect(env("EXISTING_KEY")).toBe("some-value");
	});

	it("should return the default value if the key does not exist", () => {
		expect(env("NON_EXISTENT_KEY", "default-value")).toBe("default-value");
	});

	it("should return null if the key does not exist and no default is provided", () => {
		expect(env("NON_EXISTENT_KEY")).toBeNull();
	});
});
