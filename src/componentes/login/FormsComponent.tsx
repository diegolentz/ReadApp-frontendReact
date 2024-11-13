import { InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { User } from "../../domain/loginJSON";

export const FormsComponent = ({isLoginPage,usuario,isSubmitted} : {isLoginPage:boolean, usuario:User,isSubmitted:boolean}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [visibility, setVisibility] = useState<'text'| 'password'>('password')
    
    const changeVisibility = () => {
        setVisibility(visibility === 'password' ? 'text' : 'password')
    }

    return ( 
        <>
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
        </>
    )

}