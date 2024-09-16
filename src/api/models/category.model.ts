import { Image } from "./image.model";

export class Category {
    _id: string;
    name: string;
    image: Image;

    constructor(_id: string, name: string, image: Image) {
        this._id = _id;
        this.name = name;
        this.image = image;
    }
}