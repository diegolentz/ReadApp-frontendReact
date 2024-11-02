
import { useState } from 'react';
import './viewLayout.css'
import { Link, Outlet } from 'react-router-dom'

export const ViewLayoutComponent = () => {

    const home = '/home/'

    const viewPaths = {
        login: '/login',
        home: {
            dashboard: {
                path:`${home}dashboard`,
                cleanName: "Dashboard"
            },
            author: {
                path:`${home}author`,
                cleanName: "Author"
            },
            books:  {
                path:`${home}books`,
                cleanName: "Books"
            }
        }
    }
    
    const [selectedOption, setSelectedOption] = useState(viewPaths.home.dashboard.cleanName)

    const handleOptionSelect = (option:string) => {

        setSelectedOption(option);
        
    };

    return <>

        <main>

            <header>
                <img src="/src/assets/headerLogo.svg" alt="FOTO" />
                <div>
                    <Link to={`${viewPaths.home.dashboard.path}`}>
                    <h1>ReadApp/</h1>
                    </Link>
                    <h2>{[selectedOption]}</h2>
                </div>
                
            </header>

            <div className="content">
                <Outlet context={[selectedOption.toLowerCase()]}/>
            </div>

            <ul className="nav-menu">
                
                <Link to={`${viewPaths.home.dashboard.path}`}>
                <li className="nav-menu__option" onClick={() => handleOptionSelect(viewPaths.home.dashboard.cleanName)}>
                    <img src="/src/assets/gauge.svg" alt="FOTO" />  
                </li>
                </Link>

                <Link to={`${viewPaths.home.author.path}`}>
                <li className="nav-menu__option" onClick={() => handleOptionSelect(viewPaths.home.author.cleanName)}>
                    <img src="/src/assets/authors.svg" alt="FOTO" />  
                </li>
                </Link>
                
                <Link to={`${viewPaths.home.books.path}`}>
                <li className="nav-menu__option" onClick={() => handleOptionSelect(viewPaths.home.books.cleanName)}>
                    <img src="/src/assets/book.svg" alt="FOTO" />
                </li>
                </Link>
                
                <Link to={`${viewPaths.login}`} >
                <li className="nav-menu__option" onClick={() => handleOptionSelect(`${viewPaths.login}`)}>
                    <img src="/src/assets/log-out.svg" alt="FOTO" />    
                </li>
                </Link>
            </ul>

        </main>

    </>
}
