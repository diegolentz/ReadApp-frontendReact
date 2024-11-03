import { useEffect, useState } from 'react';
import { BookJSON } from '../../domain/BookJSON';
import { bookService } from '../../service/bookService';
import { Book } from './Book';

export const BooksView = () => {

    const [books, setBooks] = useState<BookJSON[]>([]);

    const fetchData = async () => {
        const books = await bookService.getBooksShortData();
        setBooks(books);
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        books.map((book: BookJSON) => <Book book={book}></Book>)
    )
}

// export default function MyApp() {
//   return (
//     <div>
//       <h1>Counters that update separately</h1>
//       <MyButton />
//       <MyButton />
//     </div>
//   );
// }

// function MyButton() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }

//   return (
//     <button onClick={handleClick}>
//       Clicked {count} times
//     </button>
//   );
// }
