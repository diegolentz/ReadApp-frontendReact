import { useNavigate } from "react-router-dom";
import "./Create.css";
import { paths } from "../../../domain/routes";

export const Create = () => {
    const navigate = useNavigate();
    
    const createAuthor = () => {
        navigate(`/${paths.author}/create`);
        
        // navigate(`/${paths.author}/edit/${id}`);
    }

    return (
        <>
            <div >
                <button className="create" onClick={() => createAuthor()}>+</button>
            </div>
        </>
    );
}