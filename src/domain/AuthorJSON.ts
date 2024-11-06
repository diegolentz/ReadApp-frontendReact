export class CreateAuthorJSON {
    public nombre: string;
    public apellido: string;
    public lenguaNativa: string;

    constructor() {
        this.nombre = "";
        this.apellido = "";
        this.lenguaNativa = "";
    }

    toCreate(data: AuthorJSON): CreateAuthorJSON {
        return Object.assign(new CreateAuthorJSON(), {
            nombre: data.name,
            apellido: data.lastName,
            lenguaNativa: data.nationality
        });

    }

}

export class AuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality: string;
    public creator: boolean;
    public lenguajes: string[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.nationality = "";
        this.creator = true;
        this.lenguajes = [];
    }

    fromJson(data: any): AuthorJSON {
        this.id = data.id;
        this.name = data.nombre;
        this.lastName = data.apellido;
        this.nationality = data.nacionalidad;
        this.creator = data.creadorLibros;
        this.lenguajes = data.lenguaje;

        return Object.assign(new AuthorJSON(), {
            id: data.id,
            name: data.nombre,
            lastName: data.apellido,
            nationality: data.nacionalidad,
            creator: data.creadorLibros,
            lenguajes : data.lenguaje
        });
    }
    toAuthor(data: AuthorJSON): AutorEditJSON {
        return Object.assign(new AutorEditJSON(data.id, data.name, data.lastName, data.nationality), {
            id: data.id,
            nombre: data.name,
            apellido: data.lastName,
            nacionalidad: data.nationality
        });
}
}

class AutorEditJSON {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public nacionalidad: string
    ) {
    }
}

export const AuthorJson = new AuthorJSON()
export const CreateAuthorJson = new CreateAuthorJSON()