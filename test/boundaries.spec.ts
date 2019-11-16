import { Boundaries } from "../src/boundaries";
import { Rect } from "../src/rect";
import { Pos } from "../src/pos";

describe("constructor", () => {

	test("negative height", () => {

		try {
			expect(new Boundaries(-1, 1, 1, -1)).toThrowError();
		}
		catch(e){}

		try {
			expect(new Boundaries(1, 1, -1, -1)).not.toThrowError();
		}
		catch(e){}

	});

});

describe("contains", () => {

	test("positive", () => {

		let center: Pos = new Pos(10, 10);
		let b: Boundaries = Rect.create(center, 100, 100).boundaries();

		expect(b.contains(center)).toBeTruthy();

		expect(b.contains(center.shift(49, 49))).toBeTruthy();
		expect(b.contains(center.shift(50, 50))).toBeFalsy();
		expect(b.contains(center.shift(51, 51))).toBeFalsy();

		expect(b.contains(center.shift(-49, 49))).toBeTruthy();
		expect(b.contains(center.shift(-50, 50))).toBeFalsy();
		expect(b.contains(center.shift(-51, 51))).toBeFalsy();

		expect(b.contains(center.shift(49, -49))).toBeTruthy();
		expect(b.contains(center.shift(50, -50))).toBeFalsy();
		expect(b.contains(center.shift(51, -51))).toBeFalsy();

		expect(b.contains(center.shift(-49, -49))).toBeTruthy();
		expect(b.contains(center.shift(-50, -50))).toBeFalsy();
		expect(b.contains(center.shift(-51, -51))).toBeFalsy();

	});

	test("overflow", () => {

		let center: Pos = new Pos(0, 0);
		let b: Boundaries = Rect.create(center, 100, 100).boundaries();

		expect(b.contains(center)).toBeTruthy();

		expect(b.contains(center.shift(49, 49))).toBeTruthy();
		expect(b.contains(center.shift(50, 50))).toBeFalsy();
		expect(b.contains(center.shift(51, 51))).toBeFalsy();

		expect(b.contains(center.shift(-49, 49))).toBeTruthy();
		expect(b.contains(center.shift(-50, 50))).toBeFalsy();
		expect(b.contains(center.shift(-51, 51))).toBeFalsy();

		expect(b.contains(center.shift(49, -49))).toBeTruthy();
		expect(b.contains(center.shift(50, -50))).toBeFalsy();
		expect(b.contains(center.shift(51, -51))).toBeFalsy();

		expect(b.contains(center.shift(-49, -49))).toBeTruthy();
		expect(b.contains(center.shift(-50, -50))).toBeFalsy();
		expect(b.contains(center.shift(-51, -51))).toBeFalsy();

	});

});
