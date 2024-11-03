import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { BookJson, BookJSON } from "../domain/BookJSON";

class BookService {
    async getBooksShortData(): Promise<BookJSON[]> {
        const books = await axios.get(REST_SERVER_URL + "/librosSearch");
        return books.data.map((item: BookJSON) => BookJson.fromJson(item));
    }
}

export const bookService = new BookService();