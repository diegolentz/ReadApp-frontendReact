import { SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Book } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useParams } from "react-router-dom";

export const BookDetail = ({
  editable,
  emptyForm
}: {
  editable: boolean;
  emptyForm: boolean;
}) => {

  // const [book, setBook] = useState<CreateBookJSON>(new CreateBookJSON());
  const [book, setBook] = useState<Book>(new Book());

  const params = useParams();

  const getBook = async () => {
    const id = Number(params.id);
    const fetchedBook = await bookService.getBook(id);
    setBook(fetchedBook);
  };

  const editBook = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    const updatedAuthor = { ...book, [name]: value };
    setBook(Object.assign(new Book(), updatedAuthor));
  };

  useEffect(() => { getBook(); }, []);

  return (
    <>
      {emptyForm && (


        <p>ACA PODRE CREAR UN LIBRO</p>
      )}
      {!emptyForm && (
        <TextField
          label="Title"
          variant="outlined"
          onChange={editBook}
          name="title"
          disabled={!editable}
          value={book.title || ''}
          sx={{ width: '20rem' }}
        />
      )}
    </>

  );
};

export default BookDetail;

