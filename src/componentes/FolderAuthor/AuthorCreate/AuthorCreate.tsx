import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export const AuthorCreate = () => {

    const [author, setAuthor] = useState<CreateAuthorJSON>(new CreateAuthorJSON());
    const [lenguajes, setLenguajes] = useState<string[]>([]);

    const [hasError, setHasError] = useState(false);
    const [nameError, setNameError] = useState(true);
    const [lastNameError, setLastNameError] = useState(true);
    const [nameHelperText, setNameHelperText] = useState("");
    const [lastNameHelperText, setLastNameHelperText] = useState("");

    useEffect(() => {
        getIdiomas();
    }, [lenguajes]);

    const getIdiomas = async () => {
        const idiomas = await authorService.getIdiomas();
        setLenguajes(idiomas);
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

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        if (name === "nombre" || name === "apellido") {
            const { error, helperText } = validateField(name, value);
            if (name === "nombre") {
                setNameError(error);
                setNameHelperText(helperText);
            } else if (name === "apellido") {
                setLastNameError(error);
                setLastNameHelperText(helperText);
            }
        }

        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            [name]: value,
        }));
    };
    const navigate = useNavigate();

    const confirmCreate = async () => {
        const isNameValid = !nameError && author.nombre.trim() !== '';
        const isLastNameValid = !lastNameError && author.apellido.trim() !== '';
        const isNationalityValid = author.nacionalidad.trim() !== '';
    
        if (isNameValid && isLastNameValid && isNationalityValid) {
            setHasError(false);
                await authorService.createAuthor(author);
                navigate(`/author/list`);
            // onCreate(author);
        } else {
            setHasError(true); 
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="70vh">
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={3}
                width="100%"
                height="100%"
                padding={5}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    onChange={editFile}
                    name="nombre"
                    value={author.nombre}
                    sx={{ width: '20rem' }}
                    slotProps={{ input: { style: { fontSize: '1.5rem' } } }}
                    error={nameError}
                    helperText={nameError ? nameHelperText : ''}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    onChange={editFile}
                    name="apellido" 
                    value={author.apellido}
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={lastNameError}
                    helperText={lastNameError ? lastNameHelperText : ''}
                />
                <FormControl sx={{ width: '20rem' }} error={hasError}>
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select
                        labelId="nationality-select-label"
                        id="nationality-select"
                        name="nacionalidad"
                        value={author.nacionalidad || ''} 
                        label="Language"
                        onChange={editFile}
                        sx={{ width: '20rem' }}
                    >
                        {lenguajes?.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                    {hasError && (
                        <FormHelperText>Language selection is required.</FormHelperText>
                    )}
                </FormControl>
            </Box>
            <Box display="flex" justifyContent="center" gap="1rem">
                <Button variant="contained" color="error" sx={{ width: '10rem', borderRadius: "4rem" }}>
                    Cancel
                </Button>
                <Button onClick={confirmCreate} variant="contained" color="success" sx={{ width: '10rem', borderRadius: "4rem" }}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};
