import { red } from "@mui/material/colors";
import "./Create.css";
import LoupeIcon from '@mui/icons-material/Loupe';

export const Create = ({onClick} : 
    {onClick : () => void
    }) => {

    
    const createNavigation = () => {
            onClick();
        };


    return (
        
               <LoupeIcon   sx={{ fontSize: 50, color: '#ffab40'}} onClick={createNavigation}></LoupeIcon>
    );
}