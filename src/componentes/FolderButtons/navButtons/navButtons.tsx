import './navButtons.css'
import { NavLink } from 'react-router-dom';
import { paths } from '../../../domain/routes';

export const NavButtonsComponent = () => {
    
    return <>

        <ul className="nav-menu">

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
                to={`${paths.author}`}
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


        </ul>

    </>
}
