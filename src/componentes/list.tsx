import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorService } from '../service/authorService';
import { AuthorJSON } from '../domain/AuthorJSON';
import { mostrarMensajeError } from '../error-handling';
import Author from './FolderAuthor/Author/Author';
import { Alert, Box, Snackbar } from '@mui/material';
import { Create } from '@mui/icons-material';

export const List = ({ selectedOption }: { selectedOption: string }) => {
    const { type } = useParams();
    const [isBook, setState] = useState(false);
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    
    const navigate = useNavigate();

    const toEdit = (id: number) => {
        navigate(`/author/edit/${id}`);
    };
    
    const createAuthor = () => {
        navigate(`/author/create`);
    };

    const showAuthor = (id: number) => {
        navigate(`/author/show/${id}`);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const fetchData = async () => {
        try {
            const autorData = await authorService.getAuthorData();
            setAuthors(autorData);
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
        setState(selectedOption === 'book');
        fetchData();
    }, [selectedOption]);

    return (
        <>
            {!isBook && (
                <Box display="flex" flexDirection="column" position="relative" height="auto" data-testid="authors-container">
                    <Author 
                        renderAuthor={authors} 
                        onDelete={deleteAuthor} 
                        onSelect={toEdit} 
                        onDetail={showAuthor} 
                        data-testid="authors-list" 
                    />
                    <Box sx={{position: "fixed", bottom: "13rem", right: "1rem", zIndex: 1000}} data-testid="create-author-button">
                        <Create onClick={createAuthor} data-testid="create"/>
                    </Box>
                </Box>
            )}

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" data-testid="snackbar-message">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
