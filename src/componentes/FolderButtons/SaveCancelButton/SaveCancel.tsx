import { useNavigate } from "react-router-dom";

export const SaveCancelButton = ({onClick, isBook, editable} : {onClick :() => void, isBook : boolean, editable : boolean }) => {

    const navigate = useNavigate();

    const confirm = () => {
        onClick();
    }
    const cancel = () => {
        if (isBook) {
            navigate("/list/book");
        } else {
            navigate("/list/autor");
        }
    }

    return (
        <>
                {editable && <button onClick={confirm}>Confirm</button>}
                <button onClick={cancel}>Cancel</button>
        </>
    );
}