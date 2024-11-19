import './navButtons.css'
import { NavLink } from 'react-router-dom';
import { mainPaths, paths, PathTestId } from '../../../domain/routes';
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
    transition: '0.5s',
    boxShadow: shadows[2]

}));

export const NavButtonsComponent = () => {

    return <>
        <StyledBottomNavigation
            className='nav-menu'
            data-testid='bottom-nav-menu'
        >
            <StyledNavLink to={`${paths.dashboard.path}`} data-testid={`link-${PathTestId.dashboard}`}>
                <BottomNavigationAction
                    label="Dashboard"
                    icon={<AdminPanelSettingsRounded sx={{ color: 'white' }} />}
                >
                </BottomNavigationAction>
            </StyledNavLink>

            <StyledNavLink to={`${paths.author.list.path}`} data-testid={`link-${PathTestId.author}`}>
                <BottomNavigationAction label="Recents" icon={<PeopleAltTwoTone sx={{ color: 'white' }} />}>
                </BottomNavigationAction>
            </StyledNavLink>
            <StyledNavLink to={`${mainPaths.books}`} data-testid={`link-${PathTestId.books}`}>
                <BottomNavigationAction label="Recents" icon={<BookOnlineTwoTone sx={{ color: 'white' }} />}>
                </BottomNavigationAction>
            </StyledNavLink>

            <StyledNavLink to={`${paths.login.path}`} data-testid={`link-${PathTestId.login}`}>
                <BottomNavigationAction label="Recents" icon={<LogoutOutlined sx={{ color: 'white' }} />}>
                </BottomNavigationAction>
            </StyledNavLink>
        </StyledBottomNavigation>


    </>
}
