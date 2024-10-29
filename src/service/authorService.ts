import axios from "axios";
import { REST_SERVER_URL } from "../constants";
// import { AuthorJSON } from "../domain/AuthorJSON";

class AuthorService {
    // async getAuthorData(): Promise<AuthorJSON> {
    //     const data = await axios.get(REST_SERVER_URL + "/author");
    //     return AuthorJSON.fromJson(data.data);
    // }

    
}

export const authorService = new AuthorService();