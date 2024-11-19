import { blue, deepOrange, deepPurple, green, grey, purple, red } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";


export const appTheme = (mode: boolean) => {
  return createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      ...(mode ? {
        primary: { main: deepOrange[700] },
        secondary: { main: green[700] },
        success: { main: purple[200] },
        background: {
          default: grey[900]
        }
      } : {
        primary: { main: deepOrange[300] },
        secondary: { main: purple[200] },
        success: { main: green[500] },
        background: {
          default: deepOrange[50]
        }
      })
    },
  });
}

