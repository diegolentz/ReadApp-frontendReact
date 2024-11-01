import { useEffect, useState, ChangeEvent } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import "./AuthorEdit.css";
import { useParams } from "react-router-dom";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancelButton";
import { useForm } from "react-hook-form";

export const AuthorEdit = () => {
    const [author, setAuthor] = useState<AuthorJSON>();
    const { register } = useForm();
    const params = useParams();
    const { id } = params;

    const getAuthor = async (id: number) => {
        const authorData = await authorService.getAuthor(+id!);
        setAuthor(authorData);
    };

    
    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        
        console.log(name, value);
        
        const updatedAuthor = {
            ...author,
            [name]: value, 
        };
        const reloaded = Object.assign(new AuthorJSON(), updatedAuthor);
        setAuthor(reloaded);
    };

    useEffect(() => {
        getAuthor(+id!);
    }, [id]);

    return (
        <>
            <div className="formulario">
                <h3>Author Edit</h3>
                
                <form>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        defaultValue={author?.name}
                        onChange={editFile}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        {...register('lastName')}
                        defaultValue={author?.lastName}
                        onChange={editFile}
                    />

                    <label>Language</label>
                    <input
                        type="text"
                        {...register('nationality')}
                        defaultValue={author?.nationality}
                        onChange={editFile}
                    />
                </form>
                
                <SaveCancelButton />
            
            </div>
        </>
    );
};

export default AuthorEdit;
