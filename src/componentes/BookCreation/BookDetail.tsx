import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { BookListDetail } from "../../domain/BookJSON";
import { bookService } from "../../service/bookService";
import { useParams } from "react-router-dom";
import { authorService } from "../../service/authorService";
import { AuthorBook } from "../../domain/AuthorJSON";
import { CheckBox } from "@mui/icons-material";

export const BookDetail = ({
    editable,
}: {
    editable: boolean;
}) => {

    const [book, setBook] = useState<BookListDetail>(new BookListDetail());
    const [authors, setAuthors] = useState<AuthorBook[]>([]);
    const [nativeLanguage, setNativeLanguage] = useState<string>(book.author.nacionalidad);
    const [languages, setLanguages] = useState<string[]>([]);
    const params = useParams();

    const [checkedComplex, setCheckedComplex] = useState<boolean>(book.complex);
    
    const [selectedAuthor, setSelectedAuthor] = useState<string>(book.author.nombre);

    

    const [idiomas, setIdiomas] = useState({
        frances: true,
        ingles: false,
        hindi: false,
      });
    
    const handleChangeIdiomas = (event: ChangeEvent<HTMLInputElement>) => {
        setIdiomas({
          ...idiomas,
          [event.target.name]: event.target.checked,
        });
      };
    
      const { ingles, frances, hindi } = idiomas;

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const localAuthor: AuthorBook = authors.find((author: AuthorBook) => (author.id === Number(event.target.value)))
        setNativeLanguage(localAuthor.nacionalidad);
        setSelectedAuthor(localAuthor.nombre + " " + localAuthor.apellido)
        editBook(event)
    }

    const handleChangeCheckComplex = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedComplex(event.target.checked);
        editBook(event)
    };

    const getLanguages = async () => {
        const languages = await authorService.getIdiomas()
        setLanguages(languages)
        console.log(languages);
    }



    const getBook = async () => {
        const id = Number(params.id);
        const fetchedBook = await bookService.getBook(id);

        setBook(fetchedBook);
        const localstring = fetchedBook.author.apellido
        //console.log(localstring)
    };

    const getAuthors = async () => {
        const fetchedAuthors = await authorService.getAuthorDataForBooks();
        setAuthors(fetchedAuthors)
    };

    const editBook = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
      ) => {
        const { name, type } = event.target;
        const value = type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
      
        const updatedBook = { ...book, [name]: value };
        setBook(Object.assign(new BookListDetail(), updatedBook));
      
        //console.log(`Updated field: ${name}, New value: ${value}`);
        //console.log(book.complex); // Para depuración
      };

    useEffect(() => {
        getLanguages();
        if (params.id) getBook();
        if (editable) getAuthors()
    }, [params.id]);


    return (
        <>
            {(
                <Box display="flex" flexDirection="column" justifyContent="space-between"
                    alignItems="center" gap={3} sx={{ width: 500, maxWidth: '100%' }} padding={5}>
                    <TextField fullWidth
                        label="Title"
                        onChange={editBook}
                        name="title"
                        disabled={!editable}
                        value={book.title || ''}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="author-select-label">Author</InputLabel>
                        <Select
                            labelId="author-select-label"
                            id="nationality-select"
                            name="author"
                            disabled={!editable}
                            defaultValue={selectedAuthor}
                            //label="Author"
                            onChange={handleChangeSelect}
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
                    <TextField fullWidth
                        label="Editions"
                        variant="outlined"
                        onChange={editBook}
                        name="numberOfEditions"
                        disabled={!editable}
                        value={book.numberOfEditions || ''}
                    />
                    <Box display="flex" flexDirection="row" gap={3} sx={{ width: "100%" }} >
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
                    </Box>
                    <TextField fullWidth
                        label="Weekly sales"
                        variant="outlined"
                        onChange={editBook}
                        name="weeklySales"
                        disabled={!editable}
                        value={book.weeklySales || ''}
                    />
                    <FormControlLabel
                            control={
                            <Checkbox
                            checked={checkedComplex}
                            onChange={handleChangeCheckComplex}
                            name="complex"
                            disabled={!editable}
                        />
                            }
                            label="complex to read"
                        />
                    
                    <TextField
                        label="Native language"
                        name="nativeLanguage"
                        disabled
                        value={nativeLanguage}
                        sx={{ width: '20rem' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} data-testid="mock"> 
                        <FormGroup sx={{ gap: 2 }}>
                            
                        {/* <FormControlLabel
                            control={
                            <Checkbox checked={frances} onChange={handleChangeIdiomas} name="frances" />
                            }
                            label="Frances"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={ingles} onChange={handleChangeIdiomas} name="ingles" />
                            }
                            label="Ingles"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={hindi} onChange={handleChangeIdiomas} name="hindi" />
                            }
                            label="Hindi"
                        /> */}
                            
                            {/* {languages.map((lenguaje) => 
                                <FormControlLabel
                            control={
                            <Checkbox checked={frances} onChange={handleChangeIdiomas} name="frances" />
                            }
                            label="Frances"
                        />
                            )} */}
                             
                            {/* {languages.map((lenguaje) => (
                                <div key={lenguaje}>
                                    <input
                                        type="checkbox"
                                        value={lenguaje}
                                        name="languages"
                                    />
                                    <label>{lenguaje} </label>
                                </div>
                            ))} */}
                        </FormGroup>

                    </Box>
                </Box>
            )}
        </>

    );
};

export default BookDetail;
