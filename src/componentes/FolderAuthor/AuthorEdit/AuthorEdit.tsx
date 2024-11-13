import { useEffect, useState, ChangeEvent } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { AuthorJson, AuthorJSON } from "../../../domain/AuthorJSON";
import { authorService } from "../../../service/authorService";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';
import { mostrarMensajeError } from '../../../error-handling';

export const AuthorEdit = ({ editable }: { editable: boolean }) => {
  const [author, setAuthor] = useState<AuthorJSON>(new AuthorJSON());
  const [lenguajes, setLenguajes] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: { error: false, helperText: "" },
    lastName: { error: false, helperText: "" },
    nationality: { error: false, helperText: "" }
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const params = useParams();
  const navigate = useNavigate();

  const getAuthor = async () => {
    try {
      const id = Number(params.id);
      const fetchedAuthor = await authorService.getAuthor(id);
      setAuthor(fetchedAuthor);
      const idiomas = await authorService.getIdiomas();
      setLenguajes(idiomas);
    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  };

  const getIdiomas = async () => {
    try {
      const idiomas = await authorService.getIdiomas();
      setLenguajes(idiomas);
    } catch (error: any) {
      setSnackbarSeverity('error');
      mostrarMensajeError(error, setSnackbarMessage);
      setOpenSnackbar(true);
    }
  };

  const confirmEdit = async () => {
    const hasErrors = Object.values(errors).some((field) => field.error);
    if (!author.nationality || hasErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nationality: { error: !author.nationality, helperText: "Language selection is required." }
      }));
      setSnackbarSeverity('error');
      setSnackbarMessage("Please correct the errors before saving.");
      setOpenSnackbar(true);
    } else {
      const autorEdit = author.toAuthor(author);
      try {
        await authorService.editAuthor(autorEdit);
        setSnackbarSeverity('success');
        setSnackbarMessage("Author updated successfully.");
        setOpenSnackbar(true);
        setTimeout(() => navigate(`/author/list`), 2000);
      } catch (error: any) {
        setSnackbarSeverity('error');
        mostrarMensajeError(error, setSnackbarMessage);
        setOpenSnackbar(true);
      }
    }
  };

  const confirmCreate = async () => {
    const hasErrors = Object.values(errors).some((field) => field.error);

    if (!author.nationality || hasErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nationality: { error: !author.nationality, helperText: "Language selection is required." }
      }));
    } else {
      try {
        const newAuthor = AuthorJson.toCreateAuthor(author);
        await authorService.createAuthor(newAuthor);
        setSnackbarSeverity('success');
        setSnackbarMessage('Author created successfully!');
        setOpenSnackbar(true);
        setTimeout(() => navigate(`/author/list`), 2000);
      } catch (error: any) {
        setSnackbarSeverity('error');
        mostrarMensajeError(error, setSnackbarMessage);
        setOpenSnackbar(true);
      }
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
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: { error, helperText }
      }));
    }
    const updatedAuthor = { ...author, [name]: value };
    setAuthor(Object.assign(new AuthorJSON(), updatedAuthor));
  };

  useEffect(() => {
    if (params.id) {
      getAuthor();
    } else {
      getIdiomas();
    }
  }, [params.id]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          disabled={!editable}
          value={author.name || ''}
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
          disabled={!editable}
          value={author.lastName || ''}
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
            disabled={!editable}
            value={author.nationality || ''}
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
          onClick={params.id ? confirmEdit : confirmCreate}
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

export default AuthorEdit;
