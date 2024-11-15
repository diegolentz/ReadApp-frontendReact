import './login.css'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import { mostrarMensajeError } from '../../error-handling'
import { ErrorResponse } from '../../error-handling'
import { Snackbar, Box } from '@mui/material'
import { userService } from '../../service/userService'
import { useNavigate } from 'react-router-dom'
import { FormsComponent } from './FormsComponent'

export const Login = () => {
    const navigate = useNavigate()
    const [isLoginPage, setLoginPage] = useState(true)
    const [message, setMessage] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

    const [isSubmitted, setIsSubmitted] = useState(false)  

    const login = async (username:string,password:string) => {
        const loginRequest = {username,password}
        setIsSubmitted(true)  

        if (!username || !password) {
            return
        }
        
        try {
            await userService.login(loginRequest)
            setMessage('Login successful! Redirecting...')
            setSnackbarSeverity('success')
            setOpenSnackbar(true)
            setTimeout(() => navigate('/dashboard'), 2000)
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setMessage)
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    }

    const create = async (email:string,username:string,password:string,name:string) => {
        setIsSubmitted(true)  
        const createRequest = {email,username,password,name}

        if (!email || !username || !password || !name) {
            return
        }

        try {
            await userService.create(createRequest)
            setMessage('Account created successfully')
            setSnackbarSeverity('success')
            setOpenSnackbar(true)
            changePage()  
        } catch (error: unknown) {
            mostrarMensajeError(error as ErrorResponse, setMessage)
            setSnackbarSeverity('error')
            setOpenSnackbar(true)
        }
    }

    const changePage = () => {
        setLoginPage(!isLoginPage)
        setIsSubmitted(false)  
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    return  <>
        <main className="fondo-background">
            <div className="form__container">
                <Box 
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    color={'#ffffff'}
                    mx= 'auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                        <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
                    </svg>
                    <h1>ReadApp</h1>
                </Box>
            
                <FormsComponent 
                    isLoginPage = {isLoginPage}
                    isSubmitted = {isSubmitted} 
                    login       = {login}
                    changePage  = {changePage}
                    create      = {create} 
                    >                    
                </FormsComponent>

            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarSeverity === 'success' ? message : message || "An error occurred. Please try again."}
                </Alert>
            </Snackbar>
        </main>
    </>
}
