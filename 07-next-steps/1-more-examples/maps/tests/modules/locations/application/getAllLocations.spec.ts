import { getAllLocations } from "../../../../src/modules/locations/application/getAllLocations";
import { Location } from "../../../../src/modules/locations/domain/Location";

describe("getAllLocations", () => {
	it("returns all the locations from the repository", async () => {
		const locations: Location[] = [
			{ latitude: 41.38, longitude: 2.17, name: "First" },
			{ latitude: 41.4, longitude: 2.16, name: "Second" },
		];
		const repository = { getAll: jest.fn().mockResolvedValue(locations) };

		const result = await getAllLocations(repository);

		expect(repository.getAll).toHaveBeenCalled();
		expect(result).toEqual(locations);
	});
});
