import { ChangeEvent, useState } from "react";
import { CreateAuthorJSON, CreateAuthorJson } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { SaveCancelButton } from "../../FolderButtons/SaveCancelButton/SaveCancel";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../domain/routes";

export const AuthorCreate = () => {  
    const [author, setAuthor] = useState<CreateAuthorJSON>(new CreateAuthorJSON());
    const {register} = useForm();

    const navigate = useNavigate();
    
    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        const updatedAuthor = {
            ...author,
            [name]: name === "edad" ? Number(value) : value, // Convierte a número si el campo es "edad"
        };
    
        setAuthor(updatedAuthor);
    
        console.log(updatedAuthor); // Muestra el autor actualizado
    };

    const confirmCreate = async () => {
        console.log(author);
        await authorService.createAuthor(author!);
        navigate(`/${paths.author}`);
        // console.log(author);
        // Navigate("/author"); //
    };

    return (
        <>
            <div className="container">
                <h3>Author Create</h3>
                <form>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            {...register("nombre")}
                            required
                            onChange={editFile}
                        />
                        <label className="label">Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            {...register("apellido")}
                            required
                            onChange={editFile}
                        />
                        <label className="label">Last Name</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="number"
                            {...register("edad")}
                            required
                            onChange={editFile}
                        />
                        <label className="label">Years</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            {...register("seudonimo")}
                            required
                            onChange={editFile}
                        />
                        <label className="label">Alias</label>
                    </div>
                    <div className="campo input__label--effect">
                        <input
                            type="text"
                            {...register("lenguaNativa")}
                            required
                            onChange={editFile}
                        />
                        <label className="label">Lenguaje</label>
                    </div>
                    <button 
                        type="button"
                        onClick={confirmCreate}
                    >Guardar</button>
                    <SaveCancelButton />
                </form>
            </div>
        </>
    );
};
