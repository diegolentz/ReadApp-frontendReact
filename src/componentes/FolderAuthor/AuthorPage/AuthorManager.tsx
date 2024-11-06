import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
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
    const [lenguajes, setLenguajes] = useState<string[]>([]); // Estado específico para lenguajes

    const fetchData = async () => {
        const autorData = await authorService.getAuthorData();
        setAuthors(autorData);
    };

    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        setAuthors((prevAuthors) => prevAuthors.filter((author: AuthorJSON) => author.id !== id));
    };

    const toEdit = (id: number) => {
        const author = authors.find((author) => author.id === id);
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

    // Actualizar lenguajes cuando se cargan los autores
    useEffect(() => {
        if (authors.length > 0) {
            setLenguajes(authors[0].lenguajes || []);
        }
    }, [authors]);

    useEffect(() => {
        if (view === "list") {
            fetchData();
        }
    }, [view]);

    return (
        <>
            <div className="pageFormat">
                {view === "list" && (
                    <div>
                        <Author renderAuthor={authors} onDelete={deleteAuthor} onSelect={toEdit} />
                        <Create onClick={createAuthor} />
                    </div>
                )}
                {view === "edit" && (
                    <div>
                        <p>funciona!</p>
                        <AuthorEdit renderAuthor={selectedAuthor} onEdit={editAuthor} />
                    </div>
                )}
                {view === "create" && (
                    <div>
                        <p>funciona</p>
                        <AuthorCreate idiomas={lenguajes} />
                    </div>
                )}
                {view === "show" && (
                    <div>
                        {/* <Author renderAuthor={authors} onDelete={deleteAuthor} /> */}
                    </div>
                )}
            </div>
        </>
    );
};
