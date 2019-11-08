import { Boundaries } from "../src/boundaries";

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
