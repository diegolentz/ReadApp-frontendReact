import { ChangeEvent, useEffect, useState } from "react";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Alert, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";

export const Formulario = ({ autor, idiomas, onSelect, isEdit }: 
    { autor: AuthorJSON, idiomas: string[], onSelect: (updatedAuthor: AuthorJSON) => void, isEdit: boolean }) => {
    const [lenguajes, setLenguajes] = useState<string[]>(idiomas);
    const [errors, setErrors] = useState({
        name: { error: false, helperText: "" },
        lastName: { error: false, helperText: "" },
        nationality: { error: false, helperText: "" }
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    // Sincroniza el estado con las props cuando `autor` o `idiomas` cambian
    useEffect(() => {
        setLenguajes(idiomas);
    }, [idiomas]);

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
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: { error, helperText }
            }));
        }
        // Actualiza `autor` directamente usando `Object.assign`
        Object.assign(autor, { [name]: value });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const confirm = () => {
        const hasErrors = Object.values(errors).some((field) => field.error);
        if (!autor.nationality || hasErrors) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nationality: { error: !autor.nationality, helperText: "Language selection is required." }
            }));
            setSnackbarSeverity('error');
            setSnackbarMessage("Please correct the errors before saving.");
            setOpenSnackbar(true);
        } else {
            console.log(autor);
            onSelect(autor);
        }
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" height="70vh">
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box component="form" display="flex" flexDirection="column" alignItems="center" gap={3} width="100%" height="100%" padding={5}>
                <TextField
                    label="Name"
                    variant="outlined"
                    onChange={editFile}
                    name="name"
                    disabled={!isEdit}
                    value={autor.name || ''}
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={errors.name.error}
                    helperText={errors.name.error ? errors.name.helperText : ''}
                    data-testid="name-input"
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    onChange={editFile}
                    name="lastName"
                    disabled={!isEdit}
                    value={autor.lastName || ''}
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                    error={errors.lastName.error}
                    helperText={errors.lastName.error ? errors.lastName.helperText : ''}
                    data-testid="last-name-input"
                />

                <FormControl sx={{ width: '20rem' }} error={errors.nationality.error} data-testid="language-select">
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select
                        labelId="nationality-select-label"
                        id="nationality-select"
                        name="nationality"
                        disabled={!isEdit}
                        value={autor.nationality || ''}
                        label="Language"
                        onChange={(event: SelectChangeEvent) => editFile(event)}
                        sx={{ width: '20rem' }}
                        data-testid="language-select-input"
                    >
                        {lenguajes?.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.nationality.error && (
                        <FormHelperText>{errors.nationality.helperText}</FormHelperText>
                    )}
                </FormControl>

                <Button
                    onClick={confirm}
                    variant="contained"
                    color="success"
                    sx={{ width: '10rem', borderRadius: "4rem" }}
                    data-testid="save-button"
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};
