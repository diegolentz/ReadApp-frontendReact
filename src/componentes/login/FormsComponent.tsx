import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const FormsComponent = ({
  isLoginPage,
  login,
  changePage,
  create
}: {
  isLoginPage: boolean;
  login: (username: string, password: string) => void;
  changePage: () => void;
  create: (email: string, username: string, password: string, name: string) => void;
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<'text' | 'password'>('password');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validar si el formulario es válido
  const isFormValid = () => {
    const emailIsValid = /^[^@]+@[^@]+\.[^@]+$/.test(email); // Validación de email
    const nameIsValid = /^[A-Za-zÀ-ÿ\s]+$/.test(name); // Validación de nombre
    const usernameIsValid = username.trim() !== ''; // Validación de nombre de usuario
    const passwordIsValid = password.trim() !== ''; // Validación de la contraseña (ya no tiene la restricción de longitud mínima)

    if(isLoginPage){
        return  usernameIsValid && passwordIsValid
    } else{
        return emailIsValid && nameIsValid && usernameIsValid && passwordIsValid
    }

    
  };

  const changeVisibility = () => {
    setVisibility(visibility === 'password' ? 'text' : 'password');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitted(true); 

    if (!isFormValid()) {
      return; 
    }

    if (isLoginPage) {
      login(username, password);
    } else {
      create(email, username, password, name);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      maxWidth="400px"
      mx="auto"
    >
      {/* Si no es la página de login, mostrar campos para email y nombre */}
      {!isLoginPage && (
        <>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={isSubmitted && !email ? 'Field is required' :
              (isSubmitted && email && !/^[^@]+@[^@]+\.[^@]+$/.test(email)) ? 'Email must be a valid email address' : ''}
            error={isSubmitted && (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email))}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText={isSubmitted && !name ? 'Field is required' :
              (isSubmitted && name && !/^[A-Za-zÀ-ÿ\s]+$/.test(name)) ? 'Name must only contain letters and spaces' : ''}
            error={isSubmitted && (!name || !/^[A-Za-zÀ-ÿ\s]+$/.test(name))}
          />
        </>
      )}

      <TextField
        id="username"
        label="Username"
        variant="outlined"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        helperText={isSubmitted && !username ? 'Field is required' : ""}
        error={isSubmitted && !username}
      />

      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type={visibility}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        helperText={
          isSubmitted && !password
            ? 'Field is required'
            : ''
        }
        error={isSubmitted && !password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={changeVisibility}>
              {visibility === 'password' ? (
                <VisibilityOffIcon fontSize="large" />
              ) : (
                <VisibilityIcon fontSize="large" />
              )}
            </InputAdornment>
          )
        }}
      />

      {/* Botones */}
      {isLoginPage ? (
        <>
          <Button
            variant="contained"
            color="success"
            type="submit"
            data-testid="try-login"
            startIcon={<LoginIcon sx={{ fontSize: '70px' }} />}
          >
            <p>Login</p>
          </Button>

          <Button
            variant="contained"
            onClick={changePage}
            color="secondary"
            startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
          >
            <p>New account</p>
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            type="submit"
            startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
          >
            <p>Create Account</p>
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={changePage}
            startIcon={<KeyboardBackspaceIcon fontSize="large" />}
          >
            <p>Back to Login</p>
          </Button>
        </>
      )}
    </Box>
  );
};
