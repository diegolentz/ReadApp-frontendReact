/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthorBook, AuthorBookJSON } from "./AuthorJSON";

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

export type BookListDetailJSON = {
    id: number;
    title: string;
    author: AuthorBookJSON;
    numberOfPages: number;
    numberOfWords: number;
    translations: string[];
    bestSeller: boolean;
    challenging: boolean;
    image: string;
    numberOfEditions: number;
    weeklySales: number;
    complex: boolean
}

export class BookListDetail {

    constructor(        
        public id : number = 0,
        public title : string = "",
        public numberOfPages : number = 0,
        public numberOfWords : number = 0,
        public translations : string[]= [],
        public bestSeller : boolean = false,
        public challenging : boolean = false,
        public image : string = "",
        public numberOfEditions: number = 0,
        public weeklySales: number = 0,
        public complex: boolean = false) { }

    fromJson(data: BookListDetailJSON) : [BookListDetail, AuthorBook] {

        const autor = new AuthorBook (
            data.author.id, 
            data.author.nombre, 
            data.author.apellido, 
            data.author.nacionalidad)

        const book = new BookListDetail(
            data.id,
            data.title,
            data.numberOfPages,
            data.numberOfWords,
            data.translations,
            data.bestSeller,
            data.challenging,
            data.image,         
            data.numberOfEditions,
            data.weeklySales,
            data.complex
        )

        return [book, autor]
        
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

export const BookList = new BookListDetail()

export const bookJson = new Book();
