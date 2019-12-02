import { Pos, PosList, Rect } from "../src";

describe("constructor", () => {

	test("position array given", () => {

		let posArray: Pos[] = [ new Pos(0, 0), new Pos(0, 0), new Pos(0, 0) ];
		let posList: PosList = new PosList(posArray);

		expect(posList.positions).not.toBeUndefined();
		expect(posList.positions).not.toBeNull();
		expect(posList.positions.length).toBe(posArray.length);
		expect(posList.positions).toStrictEqual(posArray);

	});

	test("position array omitted", () => {

		let posList: PosList = new PosList();

		expect(posList.positions).not.toBeUndefined();
		expect(posList.positions).not.toBeNull();
		expect(posList.positions.length).toBe(0);
		expect(posList.positions).toStrictEqual([]);

	});

});

describe("adding", () => {

	test("addPosition", () => {

		let posList: PosList = new PosList();
		let p1: Pos = new Pos(1, 1);
		let p2: Pos = new Pos(2, 2);

		expect(posList.positions.length).toBe(0);

		posList.addPosition(p1);
		expect(posList.positions.length).toBe(1);
		expect(posList.positions).toContain(p1);

		posList.addPosition(p2);
		expect(posList.positions.length).toBe(2);
		expect(posList.positions).toContain(p1);
		expect(posList.positions).toContain(p2);

	});

	test("addPositionArray", () => {

		let posList: PosList = new PosList();
		let pa1: Pos[] = [ new Pos(1, 1), new Pos(2, 2) ];
		let pa2: Pos[] = [ new Pos(3, 3), new Pos(4, 4) ];

		expect(posList.positions.length).toBe(0);

		posList.addPositionArray(pa1);
		expect(posList.positions.length).toBe(2);
		expect(posList.positions).toContain(pa1[0]);
		expect(posList.positions).toContain(pa1[1]);

		posList.addPositionArray(pa2);
		expect(posList.positions.length).toBe(4);
		expect(posList.positions).toContain(pa1[0]);
		expect(posList.positions).toContain(pa1[1]);
		expect(posList.positions).toContain(pa2[0]);
		expect(posList.positions).toContain(pa2[1]);

	});

	test("addPositionList", () => {

		let posList: PosList = new PosList();
		let pl1: PosList = new PosList([ new Pos(1, 1), new Pos(2, 2) ]);
		let pl2: PosList = new PosList([ new Pos(3, 3), new Pos(4, 4) ]);

		expect(posList.positions.length).toBe(0);

		posList.addPositionList(pl1);
		expect(posList.positions.length).toBe(2);
		expect(posList.positions).toContain(pl1.positions[0]);
		expect(posList.positions).toContain(pl1.positions[1]);

		posList.addPositionList(pl2);
		expect(posList.positions.length).toBe(4);
		expect(posList.positions).toContain(pl1.positions[0]);
		expect(posList.positions).toContain(pl1.positions[1]);
		expect(posList.positions).toContain(pl2.positions[0]);
		expect(posList.positions).toContain(pl2.positions[1]);

	});

});

describe("subset", () => {

	test("positions contained", () => {

		let p1: Pos = new Pos(0.0001, 0.0001);
		let p2: Pos = new Pos(0.0002, 0.0002);
		let p3: Pos = new Pos(10, 10);

		let posList: PosList = new PosList([ p1, p2, p3 ]);

		let subset: PosList = posList.subset(Rect.create(new Pos(0, 0), 100, 100).boundaries());

		expect(subset).not.toBeUndefined();
		expect(subset).not.toBeNull();
		expect(subset.positions.length).toBe(2);
		expect(subset.positions).toContain(p1);
		expect(subset.positions).toContain(p2);
		expect(subset.positions).not.toContain(p3);

	});

	test("no positions contained", () => {

		let p1: Pos = new Pos(10, 10);
		let p2: Pos = new Pos(20, 20);
		let p3: Pos = new Pos(30, 30);

		let posList: PosList = new PosList([ p1, p2, p3 ]);

		let subset: PosList = posList.subset(Rect.create(new Pos(0, 0), 100, 100).boundaries());

		expect(subset).not.toBeUndefined();
		expect(subset).not.toBeNull();
		expect(subset.positions.length).toBe(0);
		expect(subset.positions).not.toContain(p1);
		expect(subset.positions).not.toContain(p2);
		expect(subset.positions).not.toContain(p3);

	});

	test("list empty", () => {

		let posList: PosList = new PosList();
		let subset: PosList = posList.subset(Rect.create(new Pos(0, 0), 100, 100).boundaries());

		expect(posList.positions.length).toBe(0);

		expect(subset).not.toBeUndefined();
		expect(subset).not.toBeNull();
		expect(subset.positions.length).toBe(0);

	});

});

describe("order methods", () => {

    test("order short to far away", () => {
        let p0: Pos = new Pos(0, 0);
        let p1: Pos = new Pos(1, 1);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let pa1: Pos[] = [p4, p2, p1, p3];
        let pl1 = new PosList(pa1);
        let sortedArray = pl1.sortListDistancesShort(p0, false);

        expect(sortedArray.length).toBe(4);
        expect(sortedArray[0]).toBe(p1);
        expect(sortedArray[1]).toBe(p2);
        expect(sortedArray[2]).toBe(p3);
        expect(sortedArray[3]).toBe(p4);
    });

    test("find shortest position with given start point", () => {
        let p0: Pos = new Pos(0.123, 0);
        let p1: Pos = new Pos(0.1234, 0);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let pa1: Pos[] = [p4, p2, p1, p3];
        let pl1 = new PosList(pa1);
       
        expect(pl1.findShortestPos(p0)).toBe(p1);
    });

    test("override list in instance", () => {
        let p0: Pos = new Pos(0.123, 0);
        let p1: Pos = new Pos(0.1234, 0);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let pa1: Pos[] = [p4, p2, p1, p3];
        let pl1 = new PosList(pa1);
        
        expect(pl1.positions.length).toBe(4);
        expect(pl1.positions[0]).toBe(p4);
        expect(pl1.positions[1]).toBe(p2);
        expect(pl1.positions[2]).toBe(p1);
        expect(pl1.positions[3]).toBe(p3);

        pl1.sortListDistancesShort(p0, true);

        expect(pl1.positions.length).toBe(4);
        expect(pl1.positions[0]).toBe(p1);
        expect(pl1.positions[1]).toBe(p2);
        expect(pl1.positions[2]).toBe(p3);
        expect(pl1.positions[3]).toBe(p4);
    });
})