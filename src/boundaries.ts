/**
 * Represents the latitude and longitude a Rect is bounded by
 */
export class Boundaries {

	readonly top: number;
	readonly right: number;
	readonly bottom: number;
	readonly left: number;

	/**
	 * Creates an instance of Boundaries
	 *
	 * @param top The uppermost latitude (maximum)
	 * @param right The rightmost longitude
	 * @param bottom The bottommost latitude (minimum)
	 * @param left The leftmost longitude
	 */
	constructor(top: number, right: number, bottom: number, left: number) {
		if(top < bottom) throw new Error("Height can not be negative");

		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.left = left;
	}

}
