import { Place, PlaceList, Pos, NearbySearchResult, PlaceResult, PlacesServiceStatus } from "../src";

describe("constructor", () => {
    test("place array given", () => {

        let placeArray: Place[] = [new Place("0", "0", new Pos(0, 0)), new Place("0", "0", new Pos(0, 0)), new Place("0", "0", new Pos(0, 0))];
        let placeList: PlaceList = new PlaceList(placeArray);

        expect(placeList.places).not.toBeUndefined();
        expect(placeList.places).not.toBeNull();
        expect(placeList.places.length).toBe(placeArray.length);
        expect(placeList.places).toStrictEqual(placeArray);

    });

    test("place array omitted", () => {

        let placeList: PlaceList = new PlaceList();

        expect(placeList.places).not.toBeUndefined();
        expect(placeList.places).not.toBeNull();
        expect(placeList.places.length).toBe(0);
        expect(placeList.places).toStrictEqual([]);

    });
})

describe("adding", () => {

    test("addPlace", () => {

        let placeList: PlaceList = new PlaceList();
        let p1: Pos = new Pos(1, 1);
        let p2: Pos = new Pos(2, 2);

        let place1: Place = new Place("1", "1", p1);
        let place2: Place = new Place("2", "2", p2);

        expect(placeList.places.length).toBe(0);

        placeList.addPlace(place1);
        expect(placeList.places.length).toBe(1);
        expect(placeList.places).toContain(place1);

        placeList.addPlace(place2);
        expect(placeList.places.length).toBe(2);
        expect(placeList.places).toContain(place1);
        expect(placeList.places).toContain(place2);

    });

    test("addPositionArray", () => {

        let p1: Pos = new Pos(1, 1);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let placeList: PlaceList = new PlaceList();
        let pla1: Place[] = [new Place("1", "1", p1), new Place("2", "2", p2)];
        let pla2: Place[] = [new Place("3", "3", p3), new Place("4", "4", p4)];

        expect(placeList.places.length).toBe(0);

        placeList.addPlaceArray(pla1);
        expect(placeList.places.length).toBe(2);
        expect(placeList.places).toContain(pla1[0]);
        expect(placeList.places).toContain(pla1[1]);

        placeList.addPlaceArray(pla2);
        expect(placeList.places.length).toBe(4);
        expect(placeList.places).toContain(pla1[0]);
        expect(placeList.places).toContain(pla1[1]);
        expect(placeList.places).toContain(pla2[0]);
        expect(placeList.places).toContain(pla2[1]);

    });

    test("addPositionList", () => {

        let p1: Pos = new Pos(1, 1);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let pla1: Place[] = [new Place("1", "1", p1), new Place("2", "2", p2)];
        let pla2: Place[] = [new Place("3", "3", p3), new Place("4", "4", p4)];

        let placeList: PlaceList = new PlaceList();
        let pll1: PlaceList = new PlaceList(pla1);
        let pll2: PlaceList = new PlaceList(pla2);

        expect(placeList.places.length).toBe(0);

        placeList.addPlaceList(pll1);
        expect(placeList.places.length).toBe(2);
        expect(placeList.places).toContain(pll1.places[0]);
        expect(placeList.places).toContain(pll1.places[1]);

        placeList.addPlaceList(pll2);
        expect(placeList.places.length).toBe(4);
        expect(placeList.places).toContain(pll1.places[0]);
        expect(placeList.places).toContain(pll1.places[1]);
        expect(placeList.places).toContain(pll2.places[0]);
        expect(placeList.places).toContain(pll2.places[1]);

    });
});

describe("order methods", () => {

    test("order short to far away", () => {
        let p0: Pos = new Pos(0, 0);
        let p1: Pos = new Pos(1, 1);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let place1 = new Place("1", "1", p1);
        let place2 = new Place("2", "2", p2);
        let place3 = new Place("3", "3", p3);
        let place4 = new Place("4", "4", p4);

        let pla1: Place[] = [place4, place2, place3, place1];
        let placeList: PlaceList = new PlaceList(pla1);

        let sortedArray = placeList.sortListDistancesShort(p0, false);

        expect(sortedArray.length).toBe(4);
        expect(sortedArray[0]).toBe(place1);
        expect(sortedArray[1]).toBe(place2);
        expect(sortedArray[2]).toBe(place3);
        expect(sortedArray[3]).toBe(place4);
    });

    test("find shortest place", () => {
        let p0: Pos = new Pos(0.123, 0);
        let p1: Pos = new Pos(0.1234, 0);
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let place1 = new Place("1", "1", p1);
        let place2 = new Place("2", "2", p2);
        let place3 = new Place("3", "3", p3);
        let place4 = new Place("4", "4", p4);

        let pla1: Place[] = [place4, place2, place3, place1];
        let placeList: PlaceList = new PlaceList(pla1);

        expect(placeList.findShortestPlace(p0, 120)).toBe(place1);
    });

    test("find shortest place when more then one place are in the given radius", () => {
        let p0: Pos = new Pos(0.123, 0);
        let p1: Pos = new Pos(0.1234, 0); // 44 Meters
        let p2: Pos = new Pos(0.12345, 0); // 50 Meters
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let place1 = new Place("1", "1", p1);
        let place2 = new Place("2", "2", p2);
        let place3 = new Place("3", "3", p3);
        let place4 = new Place("4", "4", p4);

        let pla1: Place[] = [place4, place2, place3, place1];
        let placeList: PlaceList = new PlaceList(pla1);

        expect(placeList.findShortestPlace(p0, 200)).toBe(place1);
    });

    test("find shortest place are null when no places in the given radius", () => {
        let p0: Pos = new Pos(0, 0);
        let p1: Pos = new Pos(1, 1); // 157km
        let p2: Pos = new Pos(2, 2);
        let p3: Pos = new Pos(3, 3);
        let p4: Pos = new Pos(4, 4);

        let place1 = new Place("1", "1", p1);
        let place2 = new Place("2", "2", p2);
        let place3 = new Place("3", "3", p3);
        let place4 = new Place("4", "4", p4);

        let pla1: Place[] = [place4, place2, place3, place1];
        let placeList: PlaceList = new PlaceList(pla1);

        expect(placeList.findShortestPlace(p0, 100)).toBe(null);
    });
})

describe("convert google api request", () => {

    test("request get converted correct", () => {
        
        let exampleRequest : NearbySearchResult = {
            results: [
                {
                    name: "test",
                    place_id: "test",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let pll1 = new PlaceList();
        pll1.convertNearbyPlaceRequest(exampleRequest, false);

        expect(pll1.places.length).toBe(1);
        expect(pll1.places[0].id).toBe(exampleRequest.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest.results[0].geometry.location.lon);
    });

    test("more then one result from a request get converted correct", () => {
        
        let exampleRequest : NearbySearchResult = {
            results: [
                {
                    name: "test",
                    place_id: "test",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                },
                {
                    name: "test2",
                    place_id: "test2",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                },
                {
                    name: "test3",
                    place_id: "test3",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let pll1 = new PlaceList();
        pll1.convertNearbyPlaceRequest(exampleRequest, false);

        expect(pll1.places.length).toBe(3);
        
        expect(pll1.places[0].id).toBe(exampleRequest.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest.results[0].geometry.location.lon);

        expect(pll1.places[1].id).toBe(exampleRequest.results[1].place_id);
        expect(pll1.places[1].name).toBe(exampleRequest.results[1].name);
        expect(pll1.places[1].location.latitude).toBe(exampleRequest.results[1].geometry.location.lat);
        expect(pll1.places[1].location.longitude).toBe(exampleRequest.results[1].geometry.location.lon);

        expect(pll1.places[2].id).toBe(exampleRequest.results[2].place_id);
        expect(pll1.places[2].name).toBe(exampleRequest.results[2].name);
        expect(pll1.places[2].location.latitude).toBe(exampleRequest.results[2].geometry.location.lat);
        expect(pll1.places[2].location.longitude).toBe(exampleRequest.results[2].geometry.location.lon);
    });

    test("append request works", () => {
        
        let exampleRequest : NearbySearchResult = {
            results: [
                {
                    name: "test",
                    place_id: "test",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let exampleRequest2 : NearbySearchResult = {
            results: [
                {
                    name: "test2",
                    place_id: "test2",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let pll1 = new PlaceList();
        pll1.convertNearbyPlaceRequest(exampleRequest, true);

        expect(pll1.places.length).toBe(1);
        expect(pll1.places[0].id).toBe(exampleRequest.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest.results[0].geometry.location.lon);

        pll1.convertNearbyPlaceRequest(exampleRequest2, true);

        expect(pll1.places.length).toBe(2);
        expect(pll1.places[0].id).toBe(exampleRequest.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest.results[0].geometry.location.lon);
        expect(pll1.places[1].id).toBe(exampleRequest2.results[0].place_id);
        expect(pll1.places[1].name).toBe(exampleRequest2.results[0].name);
        expect(pll1.places[1].location.latitude).toBe(exampleRequest2.results[0].geometry.location.lat);
        expect(pll1.places[1].location.longitude).toBe(exampleRequest2.results[0].geometry.location.lon);
    });

    test("not to append works", () => {
        
        let exampleRequest : NearbySearchResult = {
            results: [
                {
                    name: "test",
                    place_id: "test",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let exampleRequest2 : NearbySearchResult = {
            results: [
                {
                    name: "test2",
                    place_id: "test2",
                    geometry: {
                        location: {
                            lat: 0,
                            lon: 0                            
                        }
                    }
                }
            ],
            status: PlacesServiceStatus.OK
        };

        let pll1 = new PlaceList();
        pll1.convertNearbyPlaceRequest(exampleRequest, false);

        expect(pll1.places.length).toBe(1);
        expect(pll1.places[0].id).toBe(exampleRequest.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest.results[0].geometry.location.lon);

        pll1.convertNearbyPlaceRequest(exampleRequest2, false);

        expect(pll1.places.length).toBe(1);
        expect(pll1.places[0].id).toBe(exampleRequest2.results[0].place_id);
        expect(pll1.places[0].name).toBe(exampleRequest2.results[0].name);
        expect(pll1.places[0].location.latitude).toBe(exampleRequest2.results[0].geometry.location.lat);
        expect(pll1.places[0].location.longitude).toBe(exampleRequest2.results[0].geometry.location.lon);
    });



})