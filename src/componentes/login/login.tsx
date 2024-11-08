import './login.css'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import { mostrarMensajeError } from '../../error-handling'
import { ErrorResponse } from '../../error-handling'
import { CreateAccount } from './CreateAccount'
import { Snackbar, Button, TextField, Box } from '@mui/material'
import { userService } from '../../service/userService'
import { User } from '../../domain/loginJSON'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoginPage, setLoginPage] = useState(true)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })

    const usuario: User = new User('', username, password, '')
    const loginRequest = usuario.buildLoginRequest()

    const login = async (event: React.FormEvent) => {
        event.preventDefault()

        let formValid = true
        const newErrors = {
            username: '',
            password: '',
        }

        if (!username) {
            formValid = false
            newErrors.username = 'Username is required'
        }

        if (!password) {
            formValid = false
            newErrors.password = 'Password is required'
        }

        setErrors(newErrors)

        if (!formValid) {
            setSnackbarSeverity('error')
            setErrorMessage('Please fill in both fields.')
            setOpenSnackbar(true)
            return
        }

        try {
            await userService.login(loginRequest)
            setSnackbarSeverity('success')
            setOpenSnackbar(true)
            setTimeout(() => navigate('/dashboard'), 2000)
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setErrorMessage)
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    }

    const changePage = () => {
        setLoginPage(!isLoginPage)
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return (isLoginPage ? <>
        <main className="fondo-background">
            <div className="form__container">
                <div className="encabezado ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                        <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
                    </svg>
                    <h1>ReadApp</h1>
                </div>

                <Box component="form"
                    onSubmit={login}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width="100%"
                    maxWidth="400px"
                    mx="auto">
                    
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        type="text"
                        required
                        error={!!errors.username}
                        helperText={errors.username || ''}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        required
                        error={!!errors.password}
                        helperText={errors.password || ''}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        startIcon={<LoginIcon sx={{ fontSize: '70px' }} />}>
                        <p>Login</p>
                    </Button>

                    <Button
                        variant="contained"
                        onClick={changePage}
                        startIcon={<AccountCircleOutlinedIcon fontSize="large" />}>
                        <p>New account</p>
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<KeyOutlinedIcon fontSize="small" />}>
                        <p>Password Recovery</p>
                    </Button>
                </Box>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarSeverity === 'success' ? "Login successful! Redirecting..." : errorMessage || "An error occurred. Please try again."}
                </Alert>
            </Snackbar>

        </main>
    </> : <CreateAccount changePage={changePage} />)
}
