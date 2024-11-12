import { useEffect, useState } from 'react';
import { bookService } from '../../service/bookService';
import { Book, BookComponent } from './Book';
import { useNavigate } from 'react-router-dom';
import { Create } from '../FolderButtons/CreateButton/Create';

export const BooksView = () => {

    const [books, setBooks] = useState<Array<Book>>([]);

    const fetchData = async () => {
        const books = await bookService.getBooksShortData();
        setBooks(books);
    };

    const navigate = useNavigate();

    const createBook = () => {
        navigate(`/books/creation`);
    }

    useEffect(() => {
        fetchData();
    });
    
    return (
        <>
            {(
                books.map((book: Book) => <BookComponent book={book} key={book.id}></BookComponent>)
            )}
            {(
                <Create onClick={createBook}></Create>
            )}
        </>
    );

}

