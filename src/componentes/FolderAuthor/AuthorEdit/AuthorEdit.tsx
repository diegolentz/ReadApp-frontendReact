import * as React from 'react';
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
import { useForm } from "react-hook-form";
import { authorService } from "../../../service/authorService";
import { useParams } from "react-router-dom";
import { Flare } from '@mui/icons-material';

export const AuthorEdit = ({ renderAuthor, onSelect, editable }:
    { renderAuthor: AuthorJSON, onSelect: (author: AuthorJSON) => void, editable: boolean }) => {

    const [author, setAuthor] = useState<AuthorJSON>(renderAuthor);
    const params = useParams<{ id: string }>();
    const { register, setValue } = useForm();
    const [hasError, setHasError] = useState(false);

    const confirmEdit = () => {
        if (!author.nationality) {
            setHasError(true);
        } else {
            setHasError(false);
            onSelect(author);
        }
    };

    const getAuthor = async (id: number) => {
        const fetchedAuthor = await authorService.getAuthor(id);
        setAuthor(fetchedAuthor);
    };

    const editFile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        const updatedAuthor = {
            ...author,
            [name]: value,
        };
        setAuthor(Object.assign(new AuthorJSON(), updatedAuthor));
    };

    useEffect(() => {
        if (renderAuthor.id !== 0) {
            setAuthor(renderAuthor);
        } else if (params.id) {
            getAuthor(Number(params.id));
        }
    }, [renderAuthor, params.id]);

    return (
        <>
            <Box component="form"
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
                    required
                    {...register("name")}
                    onChange={editFile}
                    disabled={!editable}
                    value={author.name || ''}
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    required
                    {...register("lastName")}
                    onChange={editFile}
                    disabled={!editable}
                    value={author.lastName || ''}
                    sx={{ width: '20rem' }}
                    InputProps={{ style: { fontSize: '1.5rem' } }}
                />

                <FormControl sx={{ width: '20rem' }} error={false}>
                    <InputLabel id="nationality-select-label">Language</InputLabel>
                    <Select
                        labelId="nationality-select-label"
                        id="nationality-select"
                        name="nationality"
                        disabled={!editable}
                        value={author.nationality || ''}
                        label="Language"
                        onChange={(event: SelectChangeEvent) => editFile(event)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {author.lenguajes?.map((language) => (
                            <MenuItem key={language} value={language} sx={{display: 'flex', flexDirection:'column'}}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{/* Puedes poner aquí un mensaje de error o ayuda opcional */}</FormHelperText>
                </FormControl>



            </Box>

            <Button onClick={confirmEdit} variant="contained" color="primary" sx={{ mt: 2 }}>
                Guardar
            </Button>
        </>
    );
};

export default AuthorEdit;
