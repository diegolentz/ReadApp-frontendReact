
import './navigationMenu.css'
import { Link } from 'react-router-dom'

export const NavigationMenuComponent = () => {

    return <>
        <ul className="nav-menu">
            <li className="nav-menu__option">
                <img src="" alt="" />
                <Link to="prueba">BOTON</Link>
            </li>
        </ul>
    </>
}