export class EditAuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality: string;
    public lenguajes: string[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.nationality = "";
        this.lenguajes = [];
    }

    fromJson(data: any): EditAuthorJSON {
        this.id = data.id;
        this.name = data.nombre;
        this.lastName = data.apellido;
        this.nationality = data.nacionalidad;
        this.lenguajes = data.lenguaje;

        return this;
    }
    toAuthor(data: EditAuthorJSON): AuthorJSON {
        return Object.assign(new AuthorJSON(), {
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            nationality: data.nationality
        });
    }
}
export class AuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality: string;

    constructor() {
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.nationality = "";
    }

    fromJson(data: any): AuthorJSON {
        this.id = data.id;
        this.name = data.nombre;
        this.lastName = data.apellido;
        this.nationality = data.nacionalidad;

        return Object.assign(new AuthorJSON(), {
            id: data.id,
            name: data.nombre,
            lastName: data.apellido,
            nationality: data.nacionalidad
        });
    }
}

export const AuthorJson = new AuthorJSON()
export const EditAuthorJson = new EditAuthorJSON()