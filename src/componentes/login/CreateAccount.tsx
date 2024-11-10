import './login.css'
import { User } from '../../domain/loginJSON'
import { userService } from '../../service/userService'
import { ErrorResponse, mostrarMensajeError } from '../../error-handling'
import { useState } from 'react'
import { Box, Button, TextField, Snackbar, Alert } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const CreateAccount = ({ changePage }: { changePage: () => void }) => {
    const [errorMessage, setErrorMessage] = useState('')
   
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [formErrors, setFormErrors] = useState({
        email: '',
        username: '',
        password: '',
        name: ''
    })

    const nuevoUsuario: User = new User(email, username, password, name)
    const createRequest = nuevoUsuario.buildCreateAccountRequest()

    // Validación del formulario
    const validateForm = () => {
        const errors: any = {}

        if (!email) {
            errors.email = 'Email is required'
        } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
            errors.email = 'Email must be a valid email address'
        }

        if (!username) {
            errors.username = 'Username is required'
        } else if (username.length > 15) {
            errors.username = 'Username cannot be longer than 15 characters'
        }

        if (!password) {
            errors.password = 'Password is required'
        }

        if (!name) {
            errors.name = 'Name is required'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Crear la cuenta
    const create = async () => {
        if (!validateForm()) {
            return
        }

        try {
            const create = await userService.create(createRequest)
            setErrorMessage('Account create successfully') 
            setSnackbarSeverity('success') 
            setOpenSnackbar(true) 
            changePage() 
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setErrorMessage)
            setSnackbarSeverity('error') 
            setOpenSnackbar(true) 
        }
    }


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
        setErrorMessage('')
    }

    return <>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault()
                    create()
                }}
                display="flex"
                flexDirection="column"
                gap={2}
                width="100%"
                maxWidth="400px"
                mx="auto"
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!formErrors.email}
                    helperText={formErrors.email || ''}
                />

                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!formErrors.username}
                    helperText={formErrors.username || ''}
                />

                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!formErrors.password}
                    helperText={formErrors.password || ''}
                />

                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!formErrors.name}
                    helperText={formErrors.name || ''}
                />

                <div className="actions">
                    <Button
                        variant="contained"
                        color="success"
                        type="submit"
                        startIcon={ <AccountCircleOutlinedIcon fontSize="large"/>}
                    >
                        Create Account
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={changePage}
                        startIcon = {<KeyboardBackspaceIcon fontSize="large"/>}    
                    >
                        Back to Login
                    </Button>
                </div>
                </Box>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarSeverity === 'success' ? "Account create successfully" : errorMessage || "An error occurred. Please try again."}
                    </Alert>
                </Snackbar>
            </>
    
}
