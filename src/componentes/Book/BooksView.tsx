import { useEffect, useState } from 'react';
import { bookService } from '../../service/bookService';
import { Book, BookComponent } from './Book';

export const BooksView = () => {

    const [books, setBooks] = useState<Array<Book>>([]);

    const fetchData = async () => {
        const books = await bookService.getBooksShortData();
        setBooks(books);
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        books.map((book: Book) => <BookComponent book={book} key={book.id}></BookComponent>)
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
