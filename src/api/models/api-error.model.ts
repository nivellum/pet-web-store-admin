import { error } from "console";

export class ApiError {
    property: string;
    errors: string[];

    static isApiError(obj: any): boolean {
        if (!obj) return false;

        if (Array.isArray(obj)) {
            if (obj.length === 0) return false;
            return obj[0].property && obj[0].errors;
        }

        return obj.property && obj.errors;
    }

    constructor(property: string, errors: string[]) {
        this.property = property;
        this.errors = errors;
    }
}