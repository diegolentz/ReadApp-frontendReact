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

    const [isSubmitted, setIsSubmitted] = useState(false)  

    const newUser: User = new User(email, username, password, name)
    const createRequest = newUser.buildCreateAccountRequest()

    const create = async () => {
        setIsSubmitted(true)  

        if (!email || !username || !password || !name) {
            return
        }

        try {
            await userService.create(createRequest)
            setErrorMessage('Account created successfully')
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
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={isSubmitted && !email ? 'Field is required' : (isSubmitted && email && !/^[^@]+@[^@]+\.[^@]+$/.test(email)) ? 'Email must be a valid email address' : ''}
                error={isSubmitted && (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email))}
            />

            <TextField
                id="username"
                label="Username"
                variant="outlined"
                type="text"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                helperText={isSubmitted && !username ? 'Field is required' : (isSubmitted && username && username.length > 15) ? 'Username cannot be longer than 15 characters' : ''}
                error={isSubmitted && (!username || username.length > 15)}
            />

            <TextField
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText={isSubmitted && !password ? 'Field is required' : (isSubmitted && password && password.length > 15) ? 'Password cannot be longer than 15 characters' : ''}
                error={isSubmitted && (!password || password.length > 15)}
            />

            <TextField
                id="name"
                label="Name"
                variant="outlined"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                helperText={isSubmitted && !name ? 'Field is required' : (isSubmitted && name && !/^[A-Za-zÀ-ÿ\s]+$/.test(name)) ? 'Name must only contain letters and spaces' : ''}
                error={isSubmitted && (!name || !/^[A-Za-zÀ-ÿ\s]+$/.test(name))}
            />

            <div className="actions">
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    startIcon={<AccountCircleOutlinedIcon fontSize="large" />}
                >
                    Create Account
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={changePage}
                    startIcon={<KeyboardBackspaceIcon fontSize="large" />}
                >
                    Back to Login
                </Button>
            </div>
        </Box>

        {/* Snackbar para mostrar los mensajes de error o éxito */}
        <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                {snackbarSeverity === 'success' ? "Account created successfully" : errorMessage || "An error occurred. Please try again."}
            </Alert>
        </Snackbar>
    </>
}
