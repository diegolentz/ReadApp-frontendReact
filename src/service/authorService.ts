import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { AuthorJSON,EditAuthorJSON,AuthorJson ,EditAuthorJson} from "../domain/AuthorJSON";

class AuthorService {
    async getAuthorData(): Promise<AuthorJSON[]> {
        const data = await axios.get(REST_SERVER_URL + "/allAuthors");
        return data.data.map((item: AuthorJSON) => AuthorJson.fromJson(item));
    }

    async deleteAuthor(author : number): Promise<void> {
        await axios.delete(REST_SERVER_URL + "/deleteAutor/" + author);
    }

    async getAuthor(id: number): Promise<EditAuthorJSON> {
        const data = await axios.get(REST_SERVER_URL + "/getAutor/" + id);
        return EditAuthorJson.fromJson(data.data);   
    }

    async editAuthor(author: AuthorJSON): Promise<void> {
        await axios.put(REST_SERVER_URL + "/editAuthor" , author);
    }
}

export const authorService = new AuthorService();