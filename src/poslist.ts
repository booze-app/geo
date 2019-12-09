import { Pos } from "./pos";
import { Boundaries } from "./boundaries";

/**
 * Represents a list of positions
 */
export class PosList {

	readonly positions: Pos[];

	/**
	 * Creates an instance of PosList
	 *
	 * @param { Pos[] } positions An array of position that should be contained in the PosList
	 */
	constructor(positions?: Pos[]) {
		if(!positions) positions = [];
		this.positions = positions;
	}

	/**
	 * Add a single position
	 *
	 * @param { Pos } position The position to add
	 */
	public addPosition(position: Pos) {
		this.positions.push(position);
	}

	/**
	 * Add an array of positions
	 *
	 * @param { Pos[] } positions The array of positions to add
	 */
	public addPositionArray(positions: Pos[]) {
		this.positions.push(...positions);
	}

	/**
	 * Add positions contained in a position list
	 *
	 * @param { PosList } positionList The position list
	 */
	public addPositionList(positionList: PosList) {
		this.positions.push(...positionList.positions);
	}

	/**
	 * Creates a subset of positions contained within given boundaries
	 *
	 * @param { Boundaries } boundaries The boundaries the positions in the subset should be contained in
	 * @return { PosList } A new position list
	 */
	public subset(boundaries: Boundaries): PosList {
		return new PosList(this.positions.filter(pos => boundaries.contains(pos)));
	}

	/**
	 * Search for the point, who is shortest away from the given point
	 * @param pos The point, who should used to find the nearest point
	 */
	public findNearestPos(pos: Pos): Pos {
		return this.positions.sort((a: Pos, b: Pos) => pos.distance(a) - pos.distance(b))[0];
	}
}
