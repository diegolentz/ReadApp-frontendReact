import { Button } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'


export const Actions = ({ isLoginPage, changePage }: { isLoginPage: boolean,changePage: () => void }) => {

    return (<>
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
    </>)
} 