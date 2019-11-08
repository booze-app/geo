import { CONSTANTS } from "../src";
import { Pos } from "../src/pos";

describe("constructor", () => {

	test("latitude overflow", () => {

		expect(new Pos(0, 0).latitude).toBe(0);
		expect(new Pos(1, 0).latitude).toBe(1);
		expect(new Pos(89, 0).latitude).toBe(89);
		expect(new Pos(90, 0).latitude).toBe(90);
		expect(new Pos(91, 0).latitude).toBe(1);
		expect(new Pos(90 + 91, 0).latitude).toBe(1);

		expect(new Pos(-0, 0).latitude).toBe(-0);
		expect(new Pos(-1, 0).latitude).toBe(-1);
		expect(new Pos(-89, 0).latitude).toBe(-89);
		expect(new Pos(-90, 0).latitude).toBe(-90);
		expect(new Pos(-91, 0).latitude).toBe(-1);
		expect(new Pos(-90 - 91, 0).latitude).toBe(-1);

	});

	test("longitude overflow", () => {

		expect(new Pos(0, 0).longitude).toBe(0);
		expect(new Pos(0, 1).longitude).toBe(1);
		expect(new Pos(0, 179).longitude).toBe(179);
		expect(new Pos(0, 180).longitude).toBe(180);
		expect(new Pos(0, 181).longitude).toBe(1);
		expect(new Pos(0, 180 + 181).longitude).toBe(1);

		expect(new Pos(0, -0).longitude).toBe(0);
		expect(new Pos(0, -1).longitude).toBe(179);
		expect(new Pos(0, -179).longitude).toBe(1);
		expect(new Pos(0, -180).longitude).toBe(180);
		expect(new Pos(0, -181).longitude).toBe(179);
		expect(new Pos(0, -180 - 181).longitude).toBe(179);

	});

});

describe("latitudeHeight", () => {

	test("example values", () => {

		expect(new Pos(0, 0).latitudeHeight()).toBe(111000);
		expect(new Pos(0, 90).latitudeHeight()).toBe(111000);
		expect(new Pos(0, 180).latitudeHeight()).toBe(111000);

	});

});

describe("longitudeWidth", () => {

	test("example values", () => {

		expect(new Pos(90, 0).longitudeWidth() > 0).toBeTruthy();
		expect(new Pos(90, 0).longitudeWidth() < 1).toBeTruthy();
		expect(new Pos(0, 0).longitudeWidth()).toBeGreaterThan(111000);
		expect(new Pos(-90, 0).longitudeWidth() > 0).toBeTruthy();
		expect(new Pos(-90, 0).longitudeWidth() < 1).toBeTruthy();

	});

});

describe("shift", () => {

	test("zero arguments", () => {

		let p1: Pos = new Pos(0, 0);
		let p2: Pos = new Pos(0, 0);

		expect(p1.shift(0, 0)).toStrictEqual(p2);
		expect(p1.shift(0, 1).latitude).toBe(p2.latitude);
		expect(p1.shift(1, 0).longitude).toBe(p2.longitude);

	});

	test("latitude", () => {

		let p1: Pos = new Pos(0, 0);
		let p2: Pos = new Pos(0, 0);

		expect(p1.shift(1, 0).latitude).toBeGreaterThan(p2.latitude);
		expect(p1.shift(1, 0).longitude).toBe(p2.longitude);
		expect(p1.shift(-1, 0).latitude).toBeLessThan(p2.latitude);
		expect(p1.shift(-1, 0).longitude).toBe(p2.longitude);

	});

	test("longitude", () => {

		let p1: Pos = new Pos(0, 0);
		let p2: Pos = new Pos(0, 0);

		expect(p1.shift(0, 1).longitude).toBeGreaterThan(p2.longitude);
		expect(p1.shift(0, 1).latitude).toBe(p2.latitude);
		expect(p1.shift(0, -1).longitude).toBeGreaterThan(p2.longitude);
		expect(p1.shift(0, -1).latitude).toBe(p2.latitude);

	});

	test("circumnavigation", () => {

		let p1: Pos = new Pos(0, 0);

		expect(p1.shift(0, CONSTANTS.EQUATOR_CIRCUMFERENCE * 1000).longitude > 0).toBeTruthy();
		expect(p1.shift(0, CONSTANTS.EQUATOR_CIRCUMFERENCE * 1000).longitude < 1).toBeTruthy();

		expect(p1.shift(CONSTANTS.MERIDIAN_CIRCUMFERENCE * 1000, 0).latitude > 0).toBeTruthy();
		expect(p1.shift(CONSTANTS.MERIDIAN_CIRCUMFERENCE * 1000, 0).latitude < 1).toBeTruthy();

	});

});
