import { ChangeEvent, useEffect, useState } from "react";
import { CreateAuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export const AuthorCreate = ({ idiomas, onCreate }:
    {
        idiomas: string[],  // Lista de idiomas recibida como prop
        onCreate: (author: CreateAuthorJSON) => void  // Función callback para enviar el autor creado
    }
) => {

    const [author, setAuthor] = useState<CreateAuthorJSON>(new CreateAuthorJSON());
    const [lenguajes, setLenguajes] = useState<string[]>(idiomas);

    useEffect(() => {
        if (idiomas.length > 0) {
            setLenguajes(idiomas);
        } else {
            getIdiomas();
        }
    }, [idiomas]);

    const getIdiomas = async () => {
        const idiomas = await authorService.getAuthor(1);
        setLenguajes(idiomas.lenguajes);
    };

    // Actualización del estado del autor al cambiar los campos
    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            [name]: value, // Actualiza el campo correspondiente en el estado
        }));
    };

    const confirmCreate = () => {
        onCreate(author); // Llama a la función de callback para enviar el autor
    };

    const hasError = false; // Define hasError variable

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
                    name="nombre" // Asegúrate de que el nombre coincida con la propiedad de la clase CreateAuthorJSON
                    value={author.nombre} // Asegúrate de que el valor coincida con el estado
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    onChange={editFile}
                    name="apellido" // Asegúrate de que el nombre coincida con la propiedad de la clase CreateAuthorJSON
                    value={author.apellido} // Asegúrate de que el valor coincida con el estado
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                />
                <FormControl sx={{ width: '20rem' }} error={hasError}>
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select
                        labelId="nationality-select-label"
                        id="nationality-select"
                        name="nacionalidad" // Asegúrate de que el nombre coincida con la propiedad de la clase CreateAuthorJSON
                        value={author.nacionalidad || ''} // Asegúrate de que el valor coincida con el estado
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
