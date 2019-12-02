import { Pos } from "./pos";
import { Boundaries } from "./boundaries";

/**
 * Represents a list of positions
 */
export class PosList {

	public positions: Pos[];

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

    public findShortestPos(pos: Pos) {
        return this.sortListDistancesShort(pos)[0];
    }

    public sortListDistancesShort(pos: Pos, override: boolean = false) : Pos[] {
        return this.sortList((a: Pos, b: Pos) => pos.distance(a) - pos.distance(b), override);
    }

    private sortList(sortMethod: (a: Pos, b: Pos) => number, replace: boolean = false) : Pos[] {
        let sortedList = this.positions.sort(sortMethod);
        if(replace)
        {
            this.positions = [];
            this.positions.push(...sortedList);            
        }
        return sortedList;
    }
}
