import { useEffect, useState, ChangeEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { useNavigate, useParams } from "react-router-dom";


export const AuthorEdit = ({editable }:{  editable: boolean }) => {

    const [author, setAuthor] = useState<AuthorJSON>(new AuthorJSON());
    const [lenguajes, setLenguajes] = useState<string[]>([]);
    
    const params = useParams();
    const navigate = useNavigate();

    const [hasError, setHasError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [lastNameHelperText, setLastNameHelperText] = useState("");
    const [nameHelperText, setNameHelperText] = useState("");

    const getAuthor = async () => {
        const id = Number(params.id);
        const fetchedAuthor = await authorService.getAuthor(id);
        setAuthor(fetchedAuthor);
        const idiomas = await authorService.getIdiomas();
        setLenguajes(idiomas);
    };
 
    const confirmEdit  = async () => {
        if (!author.nationality || nameError || lastNameError) {
            setHasError(!author.nationality);
        } else {
            setHasError(false);
            const autorEdit = author.toAuthor(author);
            await authorService.editAuthor(autorEdit);
            navigate(`/author/list`);
        }
    };

    const validateField = (fieldName: string, value: string) => {
        const lettersAndSpacesRegex = /^[a-zA-Z\s]+$/;
        let error = false;
        let helperText = "";
        const trimmedValue = value.trim();
        if (!trimmedValue) {
            error = true;
            helperText = `${fieldName} cannot be empty.`;
        } else if (!lettersAndSpacesRegex.test(trimmedValue)) {
            error = true;
            helperText = `${fieldName} must contain only letters and spaces.`;
        }
        return { error, helperText };
    };

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        if (name === "name" || name === "lastName") {
            const { error, helperText } = validateField(name, value);
            if (name === "name") {
                setNameError(error);
                setNameHelperText(helperText);
            } else if (name === "lastName") {
                setLastNameError(error);
                setLastNameHelperText(helperText);
            }
        }
        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        setAuthor(Object.assign(new AuthorJSON(), updatedAuthor));
    };

    useEffect(() => {
      getAuthor();
    }, [params.id]);

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="70vh">
            <Box component="form" display="flex" flexDirection="column" alignItems="center" gap={3} width="100%" height="100%" padding={5}>
                <TextField label="Name" variant="outlined" onChange={editFile} name="name" disabled={!editable} 
                    value={author.name || ''} sx={{ width: '20rem' }} InputProps={{ style: { fontSize: '1.5rem' } }} 
                    error={nameError} helperText={nameError ? nameHelperText : ''}/>

                <TextField label="Last Name" variant="outlined" onChange={editFile} name="lastName" disabled={!editable}
                    value={author.lastName || ''} sx={{ width: '20rem' }} InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={lastNameError} helperText={lastNameError ? lastNameHelperText : ''}/>

                <FormControl sx={{ width: '20rem' }} error={hasError}>
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select labelId="nationality-select-label" id="nationality-select" name="nationality" 
                        disabled={!editable} value={author.nationality || ''} label="Language" 
                        onChange={(event: SelectChangeEvent) => editFile(event)} sx={{ width: '20rem' }}>
                        
                        {lenguajes?.map((language) => (
                            <MenuItem key={language} value={language}
                            >
                                {language}
                            </MenuItem>
                        ))}

                    </Select>
                    {hasError && (<FormHelperText>Language selection is required.</FormHelperText>)}
                </FormControl>
            </Box>

            <Box display="flex" justifyContent="center" gap="1rem" >
                <Button variant="contained" color="error" sx={{ width: '10rem', borderRadius: "4rem"  }}>
                    Cancel
                </Button>
                <Button onClick={confirmEdit} variant="contained" color="success" sx={{ width: '10rem', 
                    borderRadius: "4rem" }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default AuthorEdit;
