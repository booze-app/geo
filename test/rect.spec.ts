import { Rect } from "../src/rect";
import { Pos } from "../src/pos";
import { Boundaries } from "../src/boundaries";

describe("constructor", () => {

	test("vertices length", () => {

		let vertices: Pos[] = [ new Pos(0, 0), new Pos(0, 0), new Pos(0, 0) ];

		try {
			expect(new Rect(vertices)).toThrowError();
		}
		catch(e){}

		vertices.push(new Pos(0, 0));
		try {
			expect(new Rect(vertices)).not.toThrowError();
		}
		catch(e){}

		vertices.push(new Pos(0, 0));
		try {
			expect(new Rect(vertices)).toThrowError();
		}
		catch(e){}

	});

});

describe("create", () => {

	test("square", () => {

		let r: Rect = Rect.create(new Pos(10, 10), 100, 100);

		expect(r).not.toBeUndefined();
		expect(r).not.toBeNull();
		expect(r.vertices.length).toBe(4);

		expect(r.vertices[0].latitude).toBe(r.vertices[1].latitude);
		expect(r.vertices[3].latitude).toBe(r.vertices[2].latitude);
		expect(r.vertices[0].longitude).toBe(r.vertices[3].longitude);
		expect(r.vertices[1].longitude).toBe(r.vertices[2].longitude);

		expect(r.vertices[0].latitude).toBeLessThan(r.vertices[3].latitude);
		expect(r.vertices[1].latitude).toBeLessThan(r.vertices[2].latitude);
		expect(r.vertices[0].longitude).toBeLessThan(r.vertices[1].longitude);
		expect(r.vertices[3].longitude).toBeLessThan(r.vertices[2].longitude);

	});

	test("square overflow", () => {

		let r: Rect = Rect.create(new Pos(0, 0), 100, 100);

		expect(r).not.toBeUndefined();
		expect(r).not.toBeNull();
		expect(r.vertices.length).toBe(4);

		expect(r.vertices[0].latitude).toBe(r.vertices[1].latitude);
		expect(r.vertices[3].latitude).toBe(r.vertices[2].latitude);
		expect(r.vertices[0].longitude).toBe(r.vertices[3].longitude);
		expect(r.vertices[1].longitude).toBe(r.vertices[2].longitude);

		expect(r.vertices[0].latitude).toBeLessThan(r.vertices[3].latitude);
		expect(r.vertices[1].latitude).toBeLessThan(r.vertices[2].latitude);
		expect(r.vertices[0].longitude).toBeGreaterThan(r.vertices[1].longitude);
		expect(r.vertices[3].longitude).toBeGreaterThan(r.vertices[2].longitude);

	});

	test("rectangle horizontal", () => {

		let r: Rect = Rect.create(new Pos(10, 10), 200, 100);

		expect(r).not.toBeUndefined();
		expect(r).not.toBeNull();
		expect(r.vertices.length).toBe(4);

		expect(r.vertices[1].longitude - r.vertices[0].longitude).toBeGreaterThan(r.vertices[3].latitude - r.vertices[0].latitude);

	});

	test("rectangle vertical", () => {

		let r: Rect = Rect.create(new Pos(10, 10), 100, 200);

		expect(r).not.toBeUndefined();
		expect(r).not.toBeNull();
		expect(r.vertices.length).toBe(4);

		expect(r.vertices[1].longitude - r.vertices[0].longitude).toBeLessThan(r.vertices[3].latitude - r.vertices[0].latitude);

	});

	test("omit height", () => {

		expect(Rect.create(new Pos(10, 10), 100, 100)).toStrictEqual(Rect.create(new Pos(10, 10), 100));
		expect(Rect.create(new Pos(10, 10), 100, 200)).not.toStrictEqual(Rect.create(new Pos(10, 10), 100));

	});

});

describe("boundaries", () => {

	test("positive", () => {

		let r: Rect = Rect.create(new Pos(10, 10), 100, 100);
		let b: Boundaries = r.boundaries();

		expect(b.top).toBeGreaterThan(b.bottom);
		expect(b.right).toBeGreaterThan(b.left);

	});

	test("overflow", () => {

		let r: Rect = Rect.create(new Pos(0, 0), 100, 100);
		let b: Boundaries = r.boundaries();

		expect(b.top).toBeGreaterThan(b.bottom);
		expect(b.top).toBe(Math.abs(b.bottom));
		expect(b.right).toBeLessThan(b.left);

	});

});
