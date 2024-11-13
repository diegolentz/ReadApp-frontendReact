import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
import { Create } from "../../FolderButtons/CreateButton/Create";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";

export const AuthorList = () => {
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const autorData = await authorService.getAuthorData();
            setAuthors(autorData);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to fetch authors.');
            setOpenSnackbar(true);
        }
    };

    const toEdit = (id: number) => {
        navigate(`/author/edit/${id}`);
    };
    
    const createAuthor = () => {
        navigate(`/author/create`);
    };

    const showAuthor = (id: number) => {
        navigate(`/author/show/${id}`);
    };

    const deleteAuthor = async (id: number) => {
        try {
            await authorService.deleteAuthor(id);
            setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
            setSnackbarSeverity('success');
            setSnackbarMessage('Author deleted successfully.');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to delete author.');
            setOpenSnackbar(true);
        }
    };

    
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
                <Box display="flex" flexDirection="column" position="relative" height="auto">
                    <Author renderAuthor={authors} onDelete={deleteAuthor} onSelect={toEdit} onDetail={showAuthor} />
                    <Box sx={{position: "fixed", bottom: "13rem", right: "1rem", zIndex: 1000,}}>
                        <Create onClick={createAuthor} />
                    </Box>
                </Box>

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
