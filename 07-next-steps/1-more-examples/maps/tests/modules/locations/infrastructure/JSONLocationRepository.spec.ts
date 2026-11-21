import { createJSONLocationRepository } from "../../../../src/modules/locations/infrastructure/JSONLocationRepository";

describe("JSONLocationRepository", () => {
	it("maps every JSON location to a domain location", async () => {
		const repository = createJSONLocationRepository();

		const locations = await repository.getAll();

		expect(locations.length).toBeGreaterThan(0);
		locations.forEach((location) => {
			expect(typeof location.latitude).toBe("number");
			expect(typeof location.longitude).toBe("number");
			expect(typeof location.name).toBe("string");
		});
	});
});
