import './login.css'
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { User } from '../../domain/loginJSON';
import { userService } from '../../service/userService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mostrarMensajeError } from '../../error-handling';
import { ErrorResponse } from '../../error-handling';
import { CreateAccount } from './CreateAccount';
import { Snackbar, Button } from '@mui/material';

export const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoginPage, setLoginPage] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Control state for Snackbar visibility
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // Severity state for Snackbar

    const username: string = watch('username');
    const password: string = watch('password');

    const usuario: User = new User("", username, password, "");
    const loginRequest = usuario.buildLoginRequest();

    const login = async () => {
        if (validacion()) {
            setErrorMessage("Please fill in both fields.");
            setSnackbarSeverity('error'); // Set severity to error if validation fails
            setOpenSnackbar(true);
            return;
        }
        try {
            await userService.login(loginRequest);
            setSnackbarSeverity('success'); // Set severity to success if login is successful
            setOpenSnackbar(true); // Show Snackbar after successful login
            setTimeout(() => navigate('/dashboard'), 2000); // Delay navigation to allow Snackbar to be visible
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setErrorMessage);
            setSnackbarSeverity('error'); // Set severity to error if login fails
            setOpenSnackbar(true);
        }
    };

    const validacion = (): boolean => !username || !password;

    const changePage = () => {
        setLoginPage(!isLoginPage);
    };

    const customSubmit = (data: unknown) => {
        console.log(data);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close Snackbar
    };

    return (isLoginPage ? <>
        <main className="fondo-background">

            <div className="form__container">
                <div className="encabezado ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                        <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
                    </svg>
                    <h1>ReadApp</h1>
                </div>

                <form onSubmit={handleSubmit(customSubmit)} id="loginForm" className="form__inputs borde--iluminado" action="/submit-login" method="post">

                    <div className="campo">
                        <input type="text" {...register('username', { required: true, maxLength: 15 })} />
                        {errors.username?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                        {errors.username?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}

                        <label>Username</label>
                    </div>

                    <div className="campo">
                        <input type="password" {...register('password', { required: true })} />
                        {errors.password?.type === "required" && <div className="input__required"><span>the field cannot be empty</span></div>}
                        {errors.password?.type === "maxLength" && <div className="input__required"><span>The maximum number of characters is 15</span></div>}
                        <label>Password</label>
                    </div>

                    <div className='actions'>
                        <Button variant='contained' color='success' type='submit' onClick={login} startIcon={<LoginIcon sx={{ fontSize: '70px' }} />}>
                            <p>Login</p>
                        </Button>

                        <Button variant='contained' onClick={changePage} startIcon={<AccountCircleOutlinedIcon fontSize='large' />}>
                            <p>New account</p>
                        </Button>

                        <Button variant='contained' color='secondary' startIcon={<KeyOutlinedIcon fontSize='small' />}>
                            <p>Password Recovery</p>
                        </Button>
                    </div>

                </form>

            </div>

            {/* Snackbar for showing success or error */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000} // Duration before it closes
                onClose={handleCloseSnackbar} // Close when time runs out or the user manually closes
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarSeverity === 'success' ? "Login successful! Redirecting..." : errorMessage || "An error occurred. Please try again."}
                </Alert>
            </Snackbar>

        </main>
    </> : <CreateAccount changePage={changePage} />)
};
