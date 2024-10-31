import { useState, useEffect } from "react";
import { authorService } from "../../service/authorService";
import { AuthorJSON } from "../../domain/AuthorJSON";
import { Author } from "../Author/Author";

export const AuthorPage = () => {
    const [autores, setAutores] = useState<AuthorJSON[]>([]);

    const fetchData = async () => {
            const autorData = await authorService.getAuthorData();
            setAutores(autorData);
    };
    const deleteAuthor = async (id: number) => {
        await authorService.deleteAuthor(id);
        return [...autores];
    }



    useEffect(() => {
        fetchData();
    }, [autores]);

    return (
       <>   
            <Author renderAuthor= {autores} onDelete = {deleteAuthor}/>
       </>
    );
};
