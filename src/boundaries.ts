import { Pos } from "./pos";

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

	/**
	 * Checks if a given position is contained within the Boundaries
	 *
	 * @param {Pos} pos The Pos to check if it is contained in the Boundaries
	 * @return {boolean} True if the given pos is contained in the Boundaries
	 */
	public contains(pos: Pos): boolean {
		return (
			(
				(this.left < this.right && (pos.longitude > this.left && pos.longitude < this.right)) // left < right
				|| (this.left > this.right && !(pos.longitude < this.left && pos.longitude > this.right)) // left > right
			)
			&& (pos.latitude > this.bottom && pos.latitude < this.top)
		);
	}

}
