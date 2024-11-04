import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { Book, BookJSON } from "../domain/BookJSON";

class BookService {
    async getBooksShortData(): Promise<Book[]> {
        const books = await axios.get(REST_SERVER_URL + "/getBooksReact");
        console.log(books)
        const books2 = books.data.map((item: BookJSON) => Book.prototype.fromJson(item))
        console.log(books2)
        return books.data.map((item: BookJSON) => Book.prototype.fromJson(item));
    }
}

export const bookService = new BookService();