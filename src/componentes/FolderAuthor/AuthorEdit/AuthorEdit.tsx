import { useEffect, useState, ChangeEvent } from "react";
import { EditAuthorJson, EditAuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import "./AuthorEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancel";
import { useForm } from "react-hook-form";
import { paths } from "../../../domain/routes";

export const AuthorEdit = () => {
    const [author, setAuthor] = useState<EditAuthorJSON>();
    const { register } = useForm();
    const params = useParams();
    const { id } = params;

    const navigate = useNavigate();
    
    
    const getAuthor = async (id: number) => {
        const authorData = await authorService.getAuthor(+id!);
        setAuthor(authorData);
    };

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        console.log(name, value);

        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        const reloaded = Object.assign(new EditAuthorJSON(), updatedAuthor);
        setAuthor(reloaded);
    };

    const confirmEdit = async () => {
            const newAuthor = EditAuthorJson.toAuthor(author!);
            
        
            await authorService.editAuthor(newAuthor);
            navigate(paths.author);

        
    };
    useEffect(() => {
        getAuthor(+id!);
    }, [id]);

    return (
        <>
            <div className="container">
                <h3>Author Edit</h3>

                <form>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            required
                            {...register("name")}
                            defaultValue={author?.name}
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            required
                            {...register("lastName")}
                            defaultValue={author?.lastName}
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Last Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <select
                            {...register("nationality")}
                            defaultValue={author?.nationality}
                            onChange={editFile}
                        >
                            
                            {author?.lenguajes?.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        {/* <label className="label">Language</label> */}
                    </div>
                </form>
                <button onClick={confirmEdit}>guardar!</button>
                <SaveCancelButton />
            </div>
        </>
    );
};

export default AuthorEdit;