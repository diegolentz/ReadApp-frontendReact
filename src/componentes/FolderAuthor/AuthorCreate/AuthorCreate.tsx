import { ChangeEvent, useState } from "react";
import { CreateAuthorJSON, CreateAuthorJson } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { useForm } from "react-hook-form";

export const AuthorCreate = ({idiomas}:
    {idiomas: string[]}
) => {  
    const [author, setAuthor] = useState<CreateAuthorJSON>(new CreateAuthorJSON());
    const {register} = useForm();

    
    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        const reloaded = Object.assign(new CreateAuthorJSON(), updatedAuthor);
        setAuthor(reloaded);
    
        console.log(updatedAuthor); // Muestra el autor actualizado
    };

    const confirmCreate = async () => {
        console.log(author);
        await authorService.createAuthor(author!);
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
                            onChange={editFile}
                            placeholder=" "
                        />
                        <label className="label">Last Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <select
                            {...register("nationality")}
                            onChange={editFile}
                        >
                            
                            {idiomas.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>
                        <label className="label">Language</label>
                    </div>
                </form>
                {/* <button  onClick={confirmEdit} >guardar!</button> */}
                {/* <SaveCancelButton /> */}
            </div>
        </>
    );
};
