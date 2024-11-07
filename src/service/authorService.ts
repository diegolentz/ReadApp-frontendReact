import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { AuthorJSON,AuthorJson, AutorEditJSON, CreateAuthorJSON} from "../domain/AuthorJSON";

class AuthorService {
    async getAuthorData(): Promise<AuthorJSON[]> {
        const data = await axios.get(REST_SERVER_URL + "/allAuthors");
        return data.data.map((item: AuthorJSON) => AuthorJson.fromJson(item));
    }

    async deleteAuthor(author : number): Promise<void> {
        await axios.delete(REST_SERVER_URL + "/deleteAutor/" + author);
    }

    async editAuthor(author: AutorEditJSON): Promise<void> {
        await axios.put(REST_SERVER_URL + "/editAuthor" , author);
    }

    async createAuthor(author: CreateAuthorJSON): Promise<void> {
        await axios.post(REST_SERVER_URL + "/createAuthor", author);
    }
}

export const authorService = new AuthorService();