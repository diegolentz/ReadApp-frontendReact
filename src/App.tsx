import { createTheme, CssBaseline, styled, Switch, ThemeProvider, useColorScheme } from '@mui/material';
import './App.css'
import { AppRouter } from './routes';
import { useState } from 'react';
import { blue, deepOrange, grey, red } from '@mui/material/colors';
import { appTheme } from './AppTheme';


const StyledSwitchToggle = styled(Switch)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 5
}));


function App() {


  const [mode, setMode] = useState(false);

  const theme = appTheme(mode)

  function handleChange() {
    setMode(!mode)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
      <SwitchToggleThemeMode checked={mode} onChange={handleChange} />
    </>
  );


}

export default App

interface SwitchToggleThemeModeProps {

  checked: boolean;

  onChange: () => void;

}

function SwitchToggleThemeMode(props: SwitchToggleThemeModeProps) {
  if (window.location.pathname != '/login') {
    return (
      <>
        <StyledSwitchToggle checked={props.checked} onChange={props.onChange} />
      </>
    );
  }

}