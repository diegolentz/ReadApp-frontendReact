import { useEffect } from 'react'
import './header.css'
import { Link, useLocation } from 'react-router-dom'
import { paths } from '../../domain/routes'
import { regex } from '../../domain/regex'


export const HeaderComponent = () => {
    const location  = useLocation()
    
    useEffect(() => {}, [location.pathname]);

    const resolveSubName = (string:string) => {
        const match = string.match(regex.routeSlash)
        if(match == null){
            //ESTO ES SOLO PARA EVITAR tener <array || undefined>
            return [""]
        }
        return match
    };

    const concatName = (string:string) => {
        const list = resolveSubName(string)
        if(list.length == 1){
            return firstToUpperCase(list[0])
        }else if(list.length>1){
            return firstToUpperCase(list[0]).concat(" "+list[1])
        }
        
    };
    
    const firstToUpperCase = (string:string) => {
        if (!string || typeof string !== 'string') {
            // Necesario para los test, sino insulta por 
            // <undefined>.toUpperCase()
            return '';
    
        }
        return string[0].toUpperCase().concat(string.slice(1))
    };

    return <>

            <header>
                <img src="/src/assets/headerLogo.svg" alt="FOTO" />
                <div>
                    <Link to={`${paths.dashboard}`}>
                        <h1>ReadApp/</h1>
                    </Link>
                    <h2>{concatName(location.pathname)}</h2>
                </div>

            </header>
        
    </>
}

