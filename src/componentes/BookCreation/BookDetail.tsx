import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { BookListDetail } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useParams } from "react-router-dom";
import { authorService } from "../../service/authorService";
import { AuthorBook } from "../../domain/AuthorJSON";

export const BookDetail = ({ 
    editable, 
    emptyForm 
}: { 
    editable: boolean;
    emptyForm: boolean;
     }) => {

    // const [book, setBook] = useState<CreateBookJSON>(new CreateBookJSON());
    const [book, setBook] = useState<BookListDetail>(new BookListDetail());
    const [nativeLanguage, setNativeLanguage] = useState<string>(book.author.nacionalidad)

    const params = useParams();

    const [checked, setChecked] = useState<boolean>(book.complex);
    const [authors, setAuthors] = useState<AuthorBook[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string>(book.author.nombre)
    const [mock, setMock] = useState("a")

    const handleChangeSelect = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        const localId = Number(event.target.value);
        const localAuthor: AuthorBook = authors.find((author: AuthorBook) => (author.id === localId))
        setNativeLanguage(localAuthor.nacionalidad);
        //console.log(localAuthor)
        //console.log(mock);
        setSelectedAuthor(localAuthor.nombre + "" + localAuthor.apellido)
        editBook(event)
      }

    const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    };

    const getBook = async () => {
        const id = Number(params.id);
        const fetchedBook = await bookService.getBook(id);
        //console.log(fetchedBook);
        
        setBook(fetchedBook);
        const localstring = fetchedBook.author.apellido
        setMock(localstring)
        console.log(fetchedBook.author.apellido)
        console.log(mock);
    };

    const getAuthors = async () => { 
        const fetchedAuthors = await authorService.getAuthorDataForBooks();
        setAuthors(fetchedAuthors)
        //console.log(fetchedAuthors)
    };

    const editBook = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        const updatedBook = { ...book, [name]: value };
        setBook(Object.assign(new BookListDetail(), updatedBook));
      };
    
    useEffect(() => {
        if (params.id) getBook();
        if (editable) getAuthors()}, []);
  
    return (
    <>
    {emptyForm && (
        
        
        <p>ACA PODRE CREAR UN LIBRO</p>
        )}
    {!emptyForm && (
        <><TextField
            label="Title"
            variant="outlined"
            onChange={editBook}
            name="title"
            disabled={!editable}
            value={book.title || ''}
            sx={{ width: '20rem' }} />
          {/* <TextField
              label="Author"
              variant="outlined"
              onChange={editBook}
              name="author"
              disabled={!editable}
              value={book.author.nombre || ''}
              sx={{ width: '20rem' }} /> */}
        <FormControl sx={{ width: '20rem' }} >
                    <InputLabel id="author-select-label">Author</InputLabel>
                    <Select
                        labelId="author-select-label"
                        id="nationality-select"
                        name="Author"
                        disabled={!editable}
                        // defaultValue="gola"
                        defaultValue= {book.author.nombre}
                        label="Author"
                        onChange={handleChangeSelect}
                        sx={{ width: '20rem' }}
                    >
                        {authors.map((author) => (
                            <MenuItem 
                            key={author.nombre} 
                            value={author.id} 
                            >
                                {author.nombre + " " + author.apellido}
                            </MenuItem>
                        ))}
                    </Select>
            </FormControl>
          <TextField
              label="Editions"
              variant="outlined"
              onChange={editBook}
              name="numberOfEditions"
              disabled={!editable}
              value={book.numberOfEditions || ''}
              sx={{ width: '20rem' }} />
          <TextField
              label="Number of pages"
              variant="outlined"
              onChange={editBook}
              name="numberOfPages"
              disabled={!editable}
              value={book.numberOfPages || ''}
              sx={{ width: '20rem' }} />
          <TextField
              label="Number of words"
              variant="outlined"
              onChange={editBook}
              name="numberOfWords"
              disabled={!editable}
              value={book.numberOfWords || ''}
              sx={{ width: '20rem' }} />
          <TextField
              label="Weekly sales"
              variant="outlined"
              onChange={editBook}
              name="weeklySales"
              disabled={!editable}
              value={book.weeklySales || ''}
              sx={{ width: '20rem' }} />
            <Checkbox 
                checked={checked}
                onChange={handleChangeCheck}
                name = "complex"
                disabled={!editable}
                 />
            {/* <FormControlLabel control={
                <Checkbox 
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                name = "complex"
                disabled={!editable}
                 />} label="Complex to read"/> */}
            <TextField
              label="Native language"
              variant="outlined"
              name="weeklySales"
              disabled={!editable}
              value={nativeLanguage}
              sx={{ width: '20rem' }} />

        </>
    )}
    </>

  );
};

export default BookDetail;

