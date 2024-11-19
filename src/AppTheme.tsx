import { blue, deepOrange, red } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";


export const appTheme = (modeBool: boolean) => {
  return createTheme({
    palette: {
      mode: modeBool ? 'dark' : 'light',
      ...(modeBool ? {
        primary: {
          main: '#FFF000'
        }
      } : {
        primary: {
          main: '#000FFF'
        }
      })
    },
  });
}

