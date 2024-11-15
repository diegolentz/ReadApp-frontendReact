import { Button } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



export const Actions = ({ isLoginPage, changePage,login }: { isLoginPage: boolean,changePage: () => void, login: (username:string,password:string) => void }) => {

    return (isLoginPage ? <>
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
    </>: <>
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
        )
} 