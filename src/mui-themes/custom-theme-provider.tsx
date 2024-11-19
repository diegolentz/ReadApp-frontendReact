import { createTheme } from "@mui/material";
import { useState } from "react";

const CustomThemeProvider = () => {
    const [mode, setMode] = useState('light')

    const colorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    const theme = createTheme({
        palette: {
            mode: mode
        }
    })

}