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
            nombre: data.name,
            apellido: data.lastName,
            nacionalidad: data.nationality
        });
    }
}
export class CreateAuthorJSON {
    public lenguaNativa: string;
    public edad: number;
    public apellido: string;
    public nombre: string;
    public seudonimo: string;

    constructor() {
        this.nombre = "diego";
        this.apellido = "el mas";
        this.edad = 30;
        this.seudonimo = "tranki";
        this.lenguaNativa = "ALEMAN";
    }

}

export class AuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality: string;
    public creator: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.nationality = "";
        this.creator = true;
    }

    fromJson(data: any): AuthorJSON {
        this.id = data.id;
        this.name = data.nombre;
        this.lastName = data.apellido;
        this.nationality = data.nacionalidad;
        this.creator = data.creadorLibros;

        return Object.assign(new AuthorJSON(), {
            id: data.id,
            name: data.nombre,
            lastName: data.apellido,
            nationality: data.nacionalidad,
            creator: data.creadorLibros
        });
    }
}

export const AuthorJson = new AuthorJSON()
export const EditAuthorJson = new EditAuthorJSON()
export const CreateAuthorJson = new CreateAuthorJSON()