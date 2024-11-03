/* eslint-disable @typescript-eslint/no-explicit-any */
export class BookJSON {
    public id: number;
    public title: string;
    public author: string;
    public numberOfPages: number;
    public numberOfWords: number;
    public translations: string[];
    public isBestSeller: boolean;
    public isChallenging: boolean;

    constructor() {
        this.id = 0;
        this.title = "";
        this.author = "";
        this.numberOfPages = 0;
        this.numberOfWords = 0;
        this.translations = [];
        this.isBestSeller = false;
        this.isChallenging = false;
    }

    fromJson(data: any): BookJSON {
        this.id = data.id;
        this.title = data.titulo;
        this.author = data.autor;
        this.numberOfPages = data.cantidadPaginas;
        this.numberOfWords = data.cantidadPalabras;
        this.translations = data.traducciones;
        this.isBestSeller = data.esBestSeller;
        this.isChallenging = data.esDesafiante;

        return Object.assign(new BookJSON(), {
            id: data.id,
            title: data.titulo,
            author: data.autor,
            numberOfPages: data.cantidadPaginas,
            numberOfWords: data.cantidadPalabras,
            translations: data.traducciones,
            isBestSeller: data.esBestSeller,
            isChallenging: data.esDesafiante
        });
    }
}

export const BookJson = new BookJSON()