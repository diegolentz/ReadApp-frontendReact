import { useEffect, useState } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import "./AuthorEdit.css"
import { useParams } from "react-router-dom";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancelButton";
import { useForm } from "react-hook-form";

export const AuthorEdit = () => {

    const [author, setAuthor] = useState<AuthorJSON>();
    const { register, handleSubmit} = useForm();

    const params = useParams();
    const { id } = params;

    const getAuthor = async (id: number) => {
        const authorData = await authorService.getAuthor(id);
        setAuthor(authorData);
    }

    useEffect(() => {
        getAuthor(Number(id));
    }, [id]);

    return (
        <>
            <div className="formulario">
                <h3>Author Edit</h3>
                    <form>
                        <label>Name</label>
                        <input type="text" {...register('name')} defaultValue={author?.name} />
                        <label>Last Name</label>
                        <input type="text" {...register('lastName')} defaultValue={author?.lastName} />
                        <label>Lenguaje</label>
                        <input type="text" {...register('lenguaje')} defaultValue={author?.nationality} />
                        console.log(author.name)
                    </form>
                <SaveCancelButton />
            </div>
        </>
    );
}

export default AuthorEdit;
