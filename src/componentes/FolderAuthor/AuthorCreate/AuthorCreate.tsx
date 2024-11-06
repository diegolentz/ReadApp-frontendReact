import { ChangeEvent, useState } from "react";
import { CreateAuthorJSON, CreateAuthorJson } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { useForm } from "react-hook-form";

export const AuthorCreate = ({ idiomas, onCreate }:
    {
        idiomas: string[],
        onCreate: (author: CreateAuthorJSON) => void
    }
) => {

    const [author, setAuthor] = useState<CreateAuthorJSON>(new CreateAuthorJSON());
    const { register } = useForm();

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        setAuthor(Object.assign(new CreateAuthorJSON(), updatedAuthor));
    };

    const confirmCreate = () => {
        onCreate(author);
    };

    return (
        <>
            <div className="container">
                <h3>Author Create</h3>

                <form>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            required
                            {...register("nombre")}
                            name="nombre"
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            required
                            {...register("apellido")}
                            name="apellido"
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Last Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <select
                            {...register("nacionalidad")}
                            name="nacionalidad"
                            onChange={editFile}
                            defaultValue=""
                        >
                            <option value="" disabled>Select your language</option>
                            {idiomas.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <label className="label">Language</label>
                    </div>
                </form>
                <button onClick={confirmCreate}>Guardar</button>
            </div>
        </>
    );
};
