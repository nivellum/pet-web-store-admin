import { Image } from "./image.model";

export class Category {
    _id: string | null;
    name: string;
    image: Image | null;

    constructor( _id: string | null, name: string, image: Image | null) {
        this._id = _id;
        this.name = name;
        this.image = image;
    }
}