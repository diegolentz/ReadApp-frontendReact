import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON, CreateAuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
import "./AuthorPage.css";
import AuthorEdit from "../AuthorEdit/AuthorEdit";
import { Create } from "../../FolderButtons/CreateButton/Create";
import { AuthorCreate } from "../AuthorCreate/AuthorCreate";
import { useNavigate, useParams } from "react-router-dom";


export const AuthorManager = ({ view }: {view : string}) => {
    const [selectedAuthor, setSelectedAuthor] = useState<AuthorJSON>(new AuthorJSON());
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [lenguajes, setLenguajes] = useState<string[]>([]);
    const [editable, setEditable] = useState<boolean>(false);

    const navigate = useNavigate();
    const params = useParams<{ id: string }>();

    const fetchData = async () => {
        const autorData = await authorService.getAuthorData();
        setAuthors(autorData);
        setLenguajes(autorData[0].lenguajes);
    };

    const toEdit = (id: number) => {
        setEditable(true);
        setSelectedAuthor(authors.find((a) => a.id === id) || new AuthorJSON());
        navigate(`/author/edit/${id}`);
    };

    const editAuthor = async (author: AuthorJSON) => {
        const autorEdit = author.toAuthor(author);
        await authorService.editAuthor(autorEdit);
        setAuthors((prevAuthors) =>
            prevAuthors.map((a) => (a.id === author.id ? author : a))
        );
        navigate(`/author/list`);
    };

    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
    };
    
    const createAuthor = () => navigate(`/author/create`);

    const confirmCreate = async (author: CreateAuthorJSON) => {
        await authorService.createAuthor(author);
        navigate(`/author/list`);
    };

    const showAuthor = (id: number) => {
        setEditable(false);
        navigate(`/author/show/${id}`);
    };

    useEffect(() => {
        if (view === "list") {
            fetchData();
        } else if (view === "edit" || view === "show") {
            setEditable(view === "edit");
        }
    }, [view, params.id]);
    
    return (
        <div className="pageFormat">
            {view === "list" && (
                <div>
                    <Author renderAuthor={authors} onDelete={deleteAuthor} onSelect={toEdit} onDetail={showAuthor}/>
                    <Create onClick={createAuthor} />
                </div>
            )}
            {(view === "edit" || view === "show") && (
                <div>
                    <AuthorEdit 
                        renderAuthor={selectedAuthor} 
                        onSelect={editAuthor} 
                        editable={editable} 
                    />
                </div>
            )}
            {view === "create" && (
                <div>
                    <AuthorCreate idiomas={lenguajes} onCreate={confirmCreate} />
                </div>
            )}
        </div>
    );
};
