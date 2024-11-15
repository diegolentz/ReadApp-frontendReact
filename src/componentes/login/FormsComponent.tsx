    import { Box, Button, InputAdornment, TextField } from "@mui/material"
    import { useState } from "react"
    import VisibilityIcon from '@mui/icons-material/Visibility';
    import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
    import { User } from "../../domain/loginJSON";
    import LoginIcon from '@mui/icons-material/Login'
    import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
    import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

    export const FormsComponent = ({isLoginPage,isSubmitted,login,changePage} : {isLoginPage:boolean,isSubmitted:boolean,login:(username:string,password:string)=>void,changePage: () => void}) => {
        
        const [email, setEmail] = useState('')
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [name, setName] = useState('')
        const [visibility, setVisibility] = useState<'text'| 'password'>('password')

        
        const changeVisibility = () => {
            setVisibility(visibility === 'password' ? 'text' : 'password')
        }
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            login(username, password) // Llamar al callback con los datos
        }

        return ( 
            <>
            <Box 
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
                width="100%"
                maxWidth="400px"
                mx="auto">
                {!isLoginPage ? 
                    <>
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
                </>:<></>}   
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    helperText={isSubmitted && !username ? 'Field is required' : ""}
                    error={isSubmitted && !username}
                />

                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type={visibility}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    helperText={isSubmitted && !password ? 'Field is required' : ""}
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
                    {!isLoginPage ? 
                    <>
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
                </>:<></>} 
                {isLoginPage ? 
                <>
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
                </>: 
                <>
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
                </>
    }
            </Box>
            </>
        )

    }