import { Image } from "./image.model";

export class Category {
    _id: string | null;
    name: string;
    baseCategoryId: string;

    constructor( _id: string | null, name: string, baseCategoryId: string) {
        this._id = _id;
        this.name = name;
        this.baseCategoryId = baseCategoryId;
    }
}