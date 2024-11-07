import { useEffect, useState, ChangeEvent } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import "./AuthorEdit.css";
import { useForm } from "react-hook-form";
import { authorService } from "../../../service/authorService";
import { useParams } from "react-router-dom";

export const AuthorEdit = ({ renderAuthor, onSelect, editable }: 
    { renderAuthor: AuthorJSON, onSelect: (author: AuthorJSON) => void, editable: boolean }) => {

    const [author, setAuthor] = useState<AuthorJSON>(renderAuthor); 
    const params = useParams<{ id: string }>();
    const { register, setValue } = useForm();

    const confirmEdit = () => {
        onSelect(author);
    };

    const getAuthor = async (id: number) => {
        const fetchedAuthor = await authorService.getAuthor(id);
        setAuthor(fetchedAuthor); 
    };

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        
        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        setAuthor(Object.assign(new AuthorJSON(), updatedAuthor));
    };

    useEffect(() => {
        if (renderAuthor.id !== 0) {
            setAuthor(renderAuthor);
        } else if (params.id) {
            getAuthor(Number(params.id)); 
        }
    }, [renderAuthor, params.id]);

    // useEffect(() => {
    //     if (author.id !== 0) {
    //         setValue("name", author.name);
    //         setValue("lastName", author.lastName);
    //         setValue("nationality", author.nationality);
    //     }
    // }, [author, setValue]);

    return (
        <div className="container">
            <h3>Author Edit</h3>

            <form>
                <div className="campo input__label--effect">
                    <input
                        type="text"
                        required
                        {...register("name")}
                        onChange={editFile}
                        placeholder=" "
                        disabled={!editable}
                        value={author.name} 
                    />
                    <label className="label">Name</label>
                </div>
                <div className="campo input__label--effect">
                    <input
                        type="text"
                        required
                        {...register("lastName")}
                        onChange={editFile}
                        placeholder=" "
                        disabled={!editable}
                        value={author.lastName} 
                                            />
                    <label className="label">Last Name</label>
                </div>
                <div className="campo input__label--effect">
                    <select
                        {...register("nationality")}
                        onChange={editFile}
                        disabled={!editable}
                        value={author.nationality}
                    >
                        {author.lenguajes?.map((language) => (
                            <option key={language} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                    <label className="label">Language</label>
                </div>
            </form>

            <button onClick={confirmEdit}>Guardar</button>
        </div>
    );
};

export default AuthorEdit;
