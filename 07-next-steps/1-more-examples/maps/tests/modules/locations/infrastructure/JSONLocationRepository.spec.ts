import { createJSONLocationRepository } from "../../../../src/modules/locations/infrastructure/JSONLocationRepository";
import locationsJSON from "../../../../src/modules/locations/infrastructure/locations.json";

describe("JSONLocationRepository", () => {
	it("maps every JSON location to a domain location", async () => {
		const repository = createJSONLocationRepository();

		const locations = await repository.getAll();

		expect(locations).toEqual(
			locationsJSON.map(({ coords, name }) => ({
				latitude: coords.lat,
				longitude: coords.lng,
				name,
			}))
		);
	});
});
