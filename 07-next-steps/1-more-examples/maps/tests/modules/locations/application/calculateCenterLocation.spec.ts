import { calculateCenterLocation } from "../../../../src/modules/locations/application/calculateCenterLocation";

describe("calculateCenterLocation", () => {
	it("returns the same coordinates when there is only one location", () => {
		const center = calculateCenterLocation([{ latitude: 41.38, longitude: 2.17, name: "Single" }]);

		expect(center).toEqual({ latitude: 41.38, longitude: 2.17 });
	});

	it("returns the average latitude and longitude of all the locations", () => {
		const center = calculateCenterLocation([
			{ latitude: 10, longitude: -20, name: "First" },
			{ latitude: 20, longitude: -10, name: "Second" },
			{ latitude: 30, longitude: 0, name: "Third" },
		]);

		expect(center).toEqual({ latitude: 20, longitude: -10 });
	});

	it("throws when there are no locations", () => {
		expect(() => calculateCenterLocation([])).toThrow("Cannot calculate center of empty array.");
	});
});
