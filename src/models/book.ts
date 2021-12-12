import { ObjectId } from "mongodb";

export default class Book {
    constructor(
        public name: string,
        public authors: string[],
    ) {}
}
