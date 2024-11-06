import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
// import { Create } from "../../FolderButtons/CreateButton/Create";
import "./AuthorPage.css";
import AuthorEdit from "../AuthorEdit/AuthorEdit";
import { set } from "react-hook-form";



type ViewType = "list" | "create" | "edit" | "show";

export const AuthorManager = () => {

    const [view, setView] = useState<ViewType>("list");
    const [selectedAuthor, setSelectedAuthor] = useState<AuthorJSON>(new AuthorJSON());
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);


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
        console.log(author);
        
        const autorEdit = author.toAuthor(author);
        await authorService.editAuthor(autorEdit);
        setAuthors((prevAuthors) => 
            prevAuthors.map((a) => (a.id === author.id ? author : a))
        );
        setView("list");
    };
    

    // const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = event.target;
    //     const updatedAuthor = {
    //         ...authors,
    //         [name]: name === "edad" ? Number(value) : value, // Convierte a número si el campo es "edad"
    //     };
    //     setAuthors(updatedAuthor);
    //     console.log(updatedAuthor); // Muestra el autor actualizado
    // };
    // const confirmCreate = async () => {
    //     console.log(autores);
    //     // await authorService.createAuthor(CreateAuthorJson.toCreate(autores));
    //     // navigate(`/${paths.author}`);
    //     // console.log(author);
    // };

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
                        {/* <Author renderAuthor={authors} onDelete={deleteAuthor} /> */}
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
