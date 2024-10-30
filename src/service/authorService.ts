import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { AuthorJSON,AuthorJson } from "../domain/AuthorJSON";

class AuthorService {
    async getAuthorData(): Promise<AuthorJSON[]> {
        const data = await axios.get(REST_SERVER_URL + "/reactAutor");
        // Asegúrate de mapear cada elemento del array a una instancia de AuthorJSON
        return data.data.map((item: any) => AuthorJson.fromJson(item));
    }

    async deleteAuthor(author : number): Promise<void> {
        await axios.delete(REST_SERVER_URL + "/reactAutor/" + author);
    }
}

export const authorService = new AuthorService();