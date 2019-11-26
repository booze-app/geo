import { Place } from "./place";
import { NearbySearchResult, PlaceResult } from "./googlePlaceTypes";
import { Pos } from "./pos";
import { Rect } from "./rect";

export class PlaceList {
    readonly places : Place[]; 

    constructor(places?: Place[]) {
        if(places)
            this.places = places;
        else
            this.places = [];
    }

    public convertNearbyPlaceRequest(req: NearbySearchResult, append: boolean = false) : void {
        if(!this.validateRequest(req))
            throw Error("There are zero places to convert in the request");        
        
        if(!append)
            this.places.length = 0;

        for(let placeResult of req.results){
            this.places.push(this.convertPlaceResult(placeResult));
        }
    }

    public findShortestPlace(pos: Pos, radius: number) {
        let rect = Rect.create(pos, radius);
        let orderedList = this.sortListDistancesShort(pos);
        for(let place of orderedList) {
            if(rect.contains(place.location))
                return place;
        }
        return null;
    }

    public sortListDistancesShort(pos: Pos, override: boolean = false) : Place[] {
        return this.sortList((a: Place, b: Place) => pos.distance(b.location) - pos.distance(a.location), override);
    }

    public getList() : Place[] {
        return this.places;
    }

    public addPlace(place: Place) : void {
        this.places.push(place);
    }

    private sortList(sortMethod: (a: Place, b: Place) => number, replace: boolean = false) : Place[] {
        let sortedList = this.places.sort(sortMethod);
        if(replace)
        {
            this.places.length = 0;
            this.places.push(...sortedList);            
        }
        return sortedList;
    }

    private convertPlaceResult(place: PlaceResult) : Place {
        return new Place(place.place_id, place.name, new Pos(place.geometry.location.lat, place.geometry.location.lon));
    }

    private validateRequest(req: NearbySearchResult) : boolean {
        if(!req.results || !(req.results.length > 0) )
            return false;
        return true;
    }
}