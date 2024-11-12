/* eslint-disable @typescript-eslint/no-explicit-any */

export type BookJSON = {
    id: number;
    title: string;
    author: string;
    numberOfPages: number;
    numberOfWords: number;
    translations: string[];
    bestSeller: boolean;
    challenging: boolean;
    image: string
}
export class Book {

    constructor(        
        public id : number = 0,
        public title : string = "",
        public author : string = "",
        public numberOfPages : number = 0,
        public numberOfWords : number = 0,
        public translations : string[]= [],
        public bestSeller : boolean = false,
        public challenging : boolean = false,
        public image : string = "") {

    }

    fromJson(data: BookJSON): Book {
        return Object.assign(new Book(), data);
    }

}

// export type CreateBookJSON = {
//     id: number;
//     title: string;
//     author: string;
//     numberOfPages: number;
//     numberOfWords: number;
//     translations: string[];
//     bestSeller: boolean;
//     challenging: boolean;
// }

