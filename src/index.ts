import { Pos } from "./pos";
import { Rect } from "./rect";
import { Boundaries } from "./boundaries";

export const CONSTANTS = {
	/**
	 * Mean earth radius in kilometers
	 * according to: https://en.wikipedia.org/wiki/Earth_radius
	 */
	EARTH_RADIUS: 6371,
	/**
	 * Equator circumference in kilometers
	 * according to: https://en.wikipedia.org/wiki/Equator
	 */
	EQUATOR_CIRCUMFERENCE: 40075,
	/**
	 * Meridian circumference in kilometers
	 * according to: https://en.wikipedia.org/wiki/Meridian_(geography)
	 */
	MERIDIAN_CIRCUMFERENCE: 20003.93,
};

export default { Pos, Rect, Boundaries };
