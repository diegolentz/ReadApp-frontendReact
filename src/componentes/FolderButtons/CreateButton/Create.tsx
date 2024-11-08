import "./Create.css";
import { paths } from "../../../domain/routes";

export const Create = ({onClick} : 
    {onClick : () => void
    }) => {

    
    const createAuthor = () => {
            onClick();
        };


    return (
        <>
            <div >
                <button className="create" onClick={() => createAuthor()}>+</button>
            </div>
        </>
    );
}