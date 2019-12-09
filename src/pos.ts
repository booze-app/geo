import { CONSTANTS } from "./index";
import { Rect } from "./rect";

/**
 * Represents a geographical position
 */
export class Pos {

    readonly latitude: number;
    readonly longitude: number;

	/**
	 * Creates an instance of Pos
	 * Parameters will under-/overflow correctly
	 *
	 * @param {number} latitude The latitude of the position -90..90
	 * @param {number} longitude The longitude if the position 0..180
	 */
    public constructor(latitude: number, longitude: number) {
        this.latitude = Math.abs(latitude) > 90 ? this.latitude = latitude % 90 * ((latitude - (latitude % 90) / 90) % 2 ? 1 : -1) : latitude;
        this.longitude = Math.abs(longitude) === 180 ? 180 : ((longitude % 180) + 180) % 180;
    }

	/**
	 * Returns the height of 1 latitude-degree according to the longitude of the position in meters
	 * Currently approximated with 111,000 meters
	 *
	 * @return {number} The height of a latitude-degree in meters
	 */
    public latitudeHeight(): number {
        return 111000; // just approximate for now
    }

	/**
	 * Returns the width of 1 longitude-degree according to the latitude of the position in meters
	 *
	 * @return {number} The width of a longitude-degree in meters
	 */
    public longitudeWidth(): number {
        let rad: number = Pos.degToRad(this.latitude);

        let longitudeDistance = Math.cos(rad) * 2 * Math.PI * CONSTANTS.EARTH_RADIUS / 360; // kilometers

        return longitudeDistance * 1000; // meters
    }

	/**
	 * Shifts the position by given meters on the latitude- and/or longitude-axis
	 * Will not mutate this
	 * Parameters will under-/overflow correctly
	 *
	 * @param {number} latitudeShift Meters to shift on latitude-axis
	 * @param {number} longitudeShift Meters to shift on longitude-axis
	 * @return {Pos} The shifted position as a new instance
	 */
    public shift(latitudeShift: number, longitudeShift: number): Pos {
        let latitudeShiftDegrees: number = latitudeShift / this.latitudeHeight();
        let longitudeShiftDegrees: number = longitudeShift / this.longitudeWidth();

        return new Pos(this.latitude + latitudeShiftDegrees, this.longitude + longitudeShiftDegrees);
    }

	/**
	 * Checks if the position is contained within a given Rect
	 *
	 * @param {Rect} rect The Rect to check if the position is contained
	 * @return {boolean} True if the position is contained in the given Rect
	 */
    public in(rect: Rect): boolean {
        return rect.contains(this);
    }

    /**
     * Returns the distance to the given point in meters
     * @param {Pos} dest The destination position 
     */
    public distance(dest: Pos): number {
        let dLat = Pos.degToRad(dest.latitude - this.latitude);
        let dLon = Pos.degToRad(dest.longitude - this.longitude);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(Pos.degToRad(this.latitude)) * Math.cos(Pos.degToRad(dest.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = CONSTANTS.EARTH_RADIUS * c;
        return d;
    }

    /**
     * Convert the given number from degrees to radiants
     * @param deg The number that should be convert
     */
    public static degToRad(deg: number): number {
        return deg * (Math.PI / 180);
    }

}
