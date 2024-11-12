import './navButtons.css'
import { NavLink } from 'react-router-dom';
import { paths } from '../../../domain/routes';
import { BottomNavigation, BottomNavigationAction, Box, styled, ThemeProvider } from '@mui/material';
import { AdminPanelSettingsRounded, BookOnlineTwoTone, LogoutOutlined, PeopleAltTwoTone } from '@mui/icons-material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import shadows from '@mui/material/styles/shadows';


const StyledBottomNavigation = styled(BottomNavigation)(() => ({
    backgroundColor: deepOrange[400],
    height: 70,
    justifyContent: 'space-evenly'
}));

const StyledNavLink = styled(NavLink)(() => ({
    backgroundColor: deepPurple[400],
    borderRadius: 10,
    transition:'0.5s',
    boxShadow: shadows[2]
    
}));

export const NavButtonsComponent = () => {

    return <>
        <StyledBottomNavigation
            className='nav-menu'
            data-testid='bottom-nav-menu'
        >
                <StyledNavLink to={`${paths.dashboard}`} data-testid={`link-${paths.dashboard}`}>
                    <BottomNavigationAction
                        label="Dashboard"
                        icon={<AdminPanelSettingsRounded sx={{color:'white'}}/>}
                    >
                    </BottomNavigationAction>
                </StyledNavLink>

                <StyledNavLink to={`${paths.author}/list`} data-testid={`link-${paths.author}`}>
                    <BottomNavigationAction label="Recents" icon={<PeopleAltTwoTone sx={{color:'white'}}/>}>
                    </BottomNavigationAction>
                </StyledNavLink>
                <StyledNavLink to={`${paths.books}`} data-testid={`link-${paths.books}`}>
                    <BottomNavigationAction label="Recents" icon={<BookOnlineTwoTone sx={{color:'white'}}/>}>
                    </BottomNavigationAction>
                </StyledNavLink>

                <StyledNavLink to={`${paths.login}`} data-testid={`link-${paths.login}`}>
                    <BottomNavigationAction label="Recents" icon={<LogoutOutlined sx={{color:'white'}}/>}>
                    </BottomNavigationAction>
                </StyledNavLink>
            </StyledBottomNavigation>


    </>
}
