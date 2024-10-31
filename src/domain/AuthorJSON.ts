export class AuthorJSON {
    public id: number;
    public name: string;
    public lastName: string;
    public nationality : string;

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
            nationality : data.nacionalidad
        });
    }
}

export const AuthorJson = new AuthorJSON()