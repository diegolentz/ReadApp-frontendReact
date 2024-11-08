import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
// import "./AuthorPage.css";
import AuthorEdit from "../AuthorEdit/AuthorEdit";
import { Create } from "../../FolderButtons/CreateButton/Create";
import { AuthorCreate } from "../AuthorCreate/AuthorCreate";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";


export const AuthorManager = ({ view }: {view : string}) => {
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [editable, setEditable] = useState<boolean>(false);

    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const fetchData = async () => {
        const autorData = await authorService.getAuthorData();
        setAuthors(autorData);
    };

    const toEdit = (id: number) => {
        setEditable(true);
        navigate(`/author/edit/${id}`);
    };
    
    const createAuthor = () => navigate(`/author/create`);

    const showAuthor = (id: number) => {
        setEditable(false);
        navigate(`/author/show/${id}`);
    };

    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
    };
    
    useEffect(() => {
        if (view === "list") {
            fetchData();
        } else if (view === "edit" || view === "show") {
            setEditable(view === "edit");
        }
    }, [view, params.id]);
    
    return (
        <>
            {view === "list" && (
                <Box
                    display="flex"
                    flexDirection="column"
                    position="relative"
                    height="auto"
                >
                    <Author renderAuthor={authors} onDelete={deleteAuthor} onSelect={toEdit} onDetail={showAuthor} />
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: "13rem",
                            right: "1rem",
                            zIndex: 1000,
                        }}
                    >
                        <Create onClick={createAuthor} />
                    </Box>
                </Box>
            )}
            {(view === "edit" || view === "show") && (
                <div>
                    <AuthorEdit 
                        
                        editable={editable} 
                    />
                </div>
            )}
            {view === "create" && (
                <div>

                    <AuthorCreate  /* onCreate={confirmCreate} */ />
                </div>
            )}
        </>
    );
};
