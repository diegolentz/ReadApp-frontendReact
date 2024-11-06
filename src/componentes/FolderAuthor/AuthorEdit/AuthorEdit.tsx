import { useEffect, useState, ChangeEvent } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import "./AuthorEdit.css";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancel";
import { set, useForm } from "react-hook-form";

export const AuthorEdit = ({renderAuthor, onEdit}: 
    {renderAuthor : AuthorJSON,
     onEdit : (author: AuthorJSON) => void
    }) => {

    const { register } = useForm();
    const [author, setAuthor] = useState(renderAuthor);  

    const confirmEdit = () => {
        onEdit(author);
    }

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        const reloaded = Object.assign(new AuthorJSON(), updatedAuthor);
        setAuthor(reloaded);
    };

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
                            defaultValue={renderAuthor?.name}
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
                            defaultValue={renderAuthor?.lastName}
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Last Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <select
                            {...register("nationality")}
                            defaultValue={renderAuthor?.nationality}
                            onChange={editFile}
                        >
                            
                            {renderAuthor.lenguajes?.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <label className="label">Language</label>
                    </div>
                </form>
                <button  onClick={confirmEdit} >guardar!</button>
                {/* <SaveCancelButton /> */}
            </div>
        </>
    );
};

export default AuthorEdit;