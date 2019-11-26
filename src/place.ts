import { Pos } from "pos"

export class Place {
    public id : string;
    public name: string;
    public location: Pos;

    constructor(id : string, name : string, location: Pos ) {
        this.id = id;
        this.name = name;
        this.location = location;
    }
}