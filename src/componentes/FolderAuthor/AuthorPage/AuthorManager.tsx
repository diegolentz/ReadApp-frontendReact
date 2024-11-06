import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON, CreateAuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
import "./AuthorPage.css";
import AuthorEdit from "../AuthorEdit/AuthorEdit";
import { Create } from "../../FolderButtons/CreateButton/Create";
import { AuthorCreate } from "../AuthorCreate/AuthorCreate";

type ViewType = "list" | "create" | "edit" | "show";

export const AuthorManager = () => {
    const [view, setView] = useState<ViewType>("list");
    const [selectedAuthor, setSelectedAuthor] = useState<AuthorJSON>(new AuthorJSON());
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [lenguajes, setLenguajes] = useState<string[]>([]);
    const [editable, setEditable] = useState<boolean>(false);

    const fetchData = async () => {
        const autorData = await authorService.getAuthorData();
        setAuthors(autorData);
        setLenguajes(autorData[0].lenguajes);
    };

    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
    };

    const toEdit = (id: number) => {
        const author = authors.find((author) => author.id === id);
        setEditable(true);
        setSelectedAuthor(author!);
        setView("edit");
    };

    const editAuthor = async (author: AuthorJSON) => {
        const autorEdit = author.toAuthor(author);
        await authorService.editAuthor(autorEdit);
        setAuthors((prevAuthors) =>
            prevAuthors.map((a) => (a.id === author.id ? author : a))
        );
        setView("list");
    };

    const createAuthor = () => setView("create");

    const confirmCreate = async (author: CreateAuthorJSON) => {
        console.log(author);
        await authorService.createAuthor(author);
        setView("list");
    };

    const showAuthor = (id: number) => {
        const author = authors.find((author) => author.id === id);
        setSelectedAuthor(author!);
        setEditable(false);
        setView("show");
    }; 

    useEffect(() => {
        if (view === "list") {
            fetchData();
        }
    }, [view]);

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
                    <AuthorEdit renderAuthor={selectedAuthor} onEdit={editAuthor} editable={editable} />
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
