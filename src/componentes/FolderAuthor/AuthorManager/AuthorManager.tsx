import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
import AuthorEdit from "../AuthorEdit/AuthorEdit";
import { Create } from "../../FolderButtons/CreateButton/Create";
import { AuthorCreate } from "../AuthorCreate/AuthorCreate";
import { useNavigate } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";

export const AuthorManager = ({ view }: {view : string}) => {
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [editable, setEditable] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const navigate = useNavigate();

    // Fetch all authors
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

    // Navigate to the edit page
    const toEdit = (id: number) => {
        setEditable(true);
        navigate(`/author/edit/${id}`);
    };
    
    // Navigate to the create page
    const createAuthor = () => {
        navigate(`/author/create`);
    };

    // Show author details
    const showAuthor = (id: number) => {
        setEditable(false);
        navigate(`/author/show/${id}`);
    };

    // Delete an author
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
        if (view === "list") {
            fetchData();
        } else if (view === "edit" || view === "show") {
            setEditable(view === "edit");
        }
    }, [view]);
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            {view === "list" && (
                <Box display="flex" flexDirection="column" position="relative" height="auto">
                    <Author renderAuthor={authors} onDelete={deleteAuthor} onSelect={toEdit} onDetail={showAuthor} />
                    <Box sx={{position: "fixed", bottom: "13rem", right: "1rem", zIndex: 1000,}}>
                        <Create onClick={createAuthor} />
                    </Box>
                </Box>
            )}

            {(view === "edit" || view === "show") && (
                <div>
                    <AuthorEdit editable={editable} />
                </div>
            )}

            {view === "create" && (
                <div>
                    <AuthorCreate />
                </div>
            )}

            {/* Snackbar for feedback */}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
