import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorService } from '../service/authorService';
import { AuthorJSON } from '../domain/AuthorJSON';
import { mostrarMensajeError } from '../error-handling';
import Author from './FolderAuthor/Author/Author';
import { Alert, Box, Snackbar } from '@mui/material';
import { Create } from './FolderButtons/CreateButton/Create';
import { Book } from '../domain/BookJSON';
import { bookService } from '../service/bookService';
import { BookComponent } from './Book/Book';

export const List = ({ selectedOption }: { selectedOption: string }) => {
    const [isBook, setIsBook] = useState<boolean | null>(null);
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [books, setBooks] = useState<Array<Book>>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const navigate = useNavigate();

    const createAuthor = () => {
        navigate(`/${selectedOption}/create`);
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const fetchData = async () => {
        try {
            if(isBook){
                const books = await bookService.getBooksShortData();
                setBooks(books);
            }else{
                const autorData = await authorService.getAuthorData();
                setAuthors(autorData);
            }
        } catch (error: any) {
            setSnackbarSeverity('error');
            mostrarMensajeError(error, setSnackbarMessage);
            setOpenSnackbar(true);
        }
    };

    const deleteAuthor = async (id: number) => {
        try {
            await authorService.deleteAuthor(id);
            setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
            setSnackbarSeverity('success');
            setSnackbarMessage('Author deleted successfully.');
            setOpenSnackbar(true);
        } catch (error: any) {
            setSnackbarSeverity('error');
            mostrarMensajeError(error, setSnackbarMessage);
            setOpenSnackbar(true);
        }
    };
    useEffect(() => {
        if (selectedOption === 'book') {
            setIsBook(true);
        } else if (selectedOption === 'autor') {
            setIsBook(false);
        }
        fetchData();
      
    }, [selectedOption, isBook]);
    
    return (
        <>
            <Box display="flex" flexDirection="column" position="relative" height="auto" data-testid="authors-container">
                
                {!isBook ? (
                    authors.map((autor) => (<Author renderAuthor={autor} onDelete={deleteAuthor}/>))
                ) : (
                    books.map((book) => (<BookComponent book={book}/>))
                )}

                <Box sx={{position: "fixed", bottom: "13rem", right: "1rem", zIndex: 1000}} data-testid="create-author-button">
                    <Create onClick={createAuthor} data-testid="create"/>
                </Box>
            </Box>

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" data-testid="snackbar-message">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
