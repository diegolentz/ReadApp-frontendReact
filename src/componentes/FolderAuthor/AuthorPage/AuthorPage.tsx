import { useState, useEffect } from "react";
import { authorService } from "../../../service/authorService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Author } from "../Author/Author";
import { Create } from "../../FolderButtons/CreateButton/Create";
import "./AuthorPage.css";
import { useParams } from "react-router-dom";

export const AuthorPage = () => {
    const [autores, setAutores] = useState<AuthorJSON[]>([]);
    


    const fetchData = async () => {
        const autorData = await authorService.getAuthorData();
        setAutores(autorData);
    };

    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        setAutores((prevAutores) => prevAutores.filter(author => author.id !== id));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>   
            <div className="pageFormat">
                <h3>Authors Page</h3>
                <Author renderAuthor={autores} onDelete={deleteAuthor} />
                <Create></Create>
            </div>

        </>
    );
};
