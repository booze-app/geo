import * as pos from "./pos";
import * as rect from "./rect";
import * as boundaries from "./boundaries";

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

export const Pos = pos.Pos;
export const Rect = rect.Rect;
export const Boundaries = boundaries.Boundaries;
