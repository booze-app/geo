import { Pos } from "./pos";
import { Boundaries } from "./boundaries";

/**
 * Represents a rectangle bounded by 4 vertices represented by geographical positions
 */
export class Rect {

	readonly vertices: Pos[];

	/**
	 * Creates an instance of Rect
	 *
	 * @param {Pos[]} vertices An array of Pos through which the Rect should be bounded
	 */
	constructor(vertices: Pos[]) {
		if(vertices.length != 4) throw new Error("Exactly 4 vertices needed");
		this.vertices = vertices;
	}

	/**
	 * Constructs an instance of Rect using a center-position and dimensions
	 * If height is omitted, a square with the dimensions of width
	 *
	 * @param {Pos} center The center-position of the Rect
	 * @param {number} width The width of the Rect in meters
	 * @param {number} height The height of the Rect in meters
	 * @return {Rect} A net instance of Rect
	 */
	public static create(center: Pos, width: number, height?: number): Rect {
		if(!height) height = width;

		let half_width: number = width / 2;
		let half_height: number = height / 2;

		return new Rect([
			center.shift(-half_height, -half_width),
			center.shift(-half_height, +half_width),
			center.shift(+half_height, +half_width),
			center.shift(+half_height, -half_width)
		]);
	}

	/**
	 * Returns the boundaries of the Rect
	 *
	 * @return {Boundaries} The Boundaries of the Rect
	 */
	public boundaries(): Boundaries {
		let leftLimit: number, rightLimit: number;
		if(this.vertices[0].longitude < this.vertices[1].longitude) { // completely right of prime meridian
			leftLimit = Math.min(...this.vertices.map(v => v.longitude));
			rightLimit = Math.max(...this.vertices.map(v => v.longitude));
		}
		else { // at least partially left of prime meridian
			leftLimit = Math.max(...this.vertices.map(v => v.longitude));
			rightLimit = Math.min(...this.vertices.map(v => v.longitude));
		}
		let lowerLimit: number = Math.min(...this.vertices.map(v => v.latitude));
		let upperLimit: number = Math.max(...this.vertices.map(v => v.latitude));

		return new Boundaries (upperLimit, rightLimit, lowerLimit, leftLimit);
	}

	/**
	 * Checks if a given position is contained within the Rect
	 *
	 * @param {Pos} pos The Pos to check if it is contained in the Rect
	 * @return {boolean} True if the given pos is contained in the Rect
	 */
	public contains(pos: Pos): boolean {
		return this.boundaries().contains(pos);
	}

}
