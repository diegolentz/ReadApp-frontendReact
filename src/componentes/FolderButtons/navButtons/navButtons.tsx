import './navButtons.css'
import { NavLink } from 'react-router-dom';
import { paths } from '../../../domain/routes';
import { BottomNavigation, BottomNavigationAction, Box, createTheme } from '@mui/material';
import { useState } from 'react';
import { AdminPanelSettingsRounded, BookOnlineTwoTone, LogoutOutlined, PeopleAltTwoTone } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: deepOrange[600],
      },
    },
});


export const NavButtonsComponent = () => {
    const [value, setValue] = useState('recent');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

    return <>

        <BottomNavigation
            value={value}
            onChange={handleChange}
            className='nav-menu'
            sx={{
                bgcolor: deepOrange[500]
            }}
        >  
            <NavLink to={`${paths.dashboard}`}>
                <BottomNavigationAction
                label="Dashboard"
                icon={<AdminPanelSettingsRounded />}
                >
                </BottomNavigationAction>
            </NavLink>
            
            <NavLink to={`${paths.author}`}>
                <BottomNavigationAction label="Recents" icon={<PeopleAltTwoTone />}>
                </BottomNavigationAction>
            </NavLink>
            <NavLink to={`${paths.books}`}>
                <BottomNavigationAction label="Recents" icon={<BookOnlineTwoTone />}>
                </BottomNavigationAction>
            </NavLink>
            
            <NavLink to={`${paths.login}`}>
                <BottomNavigationAction label="Recents" icon={<LogoutOutlined />}>
                </BottomNavigationAction>
            </NavLink>
        </BottomNavigation>

        {/* <ul className="nav-menu">

            <NavLink
                to={`${paths.dashboard}`}
                className={({ isActive }) =>
                    isActive ? "active" : "pending"
                }
            >
                <li className="nav-menu__option">
                    <img src="/src/assets/gauge.svg" alt="FOTO" />
                </li>
            </NavLink>

            <NavLink
                to={`${paths.author}/list`}
                className={({ isActive }) =>
                    isActive ? "active" : "pending"
                }
            >
                <li className="nav-menu__option" >
                    <img src="/src/assets/authors.svg" alt="FOTO" />
                </li>

            </NavLink>

            <NavLink
                to={`${paths.books}`}
                className={({ isActive }) =>
                    isActive ? "active" : "pending"
                }
            >
                <li className="nav-menu__option" >
                    <img src="/src/assets/book.svg" alt="FOTO" />
                </li>

            </NavLink>

            <NavLink
                to={`${paths.login}`}
                className={({ isActive }) =>
                    isActive ? "active" : "pending"
                }
            >
                <li className="nav-menu__option">
                    <img src="/src/assets/log-out.svg" alt="FOTO" />
                </li>

            </NavLink>


        </ul> */}

    </>
}
