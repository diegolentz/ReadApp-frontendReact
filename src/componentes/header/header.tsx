import { useEffect, useState } from 'react'
import './Dashboard.css'

export const Dashboard = () => {
    const [recomendations, setRecomendations] = useState(0)
    const[books, setBooks] = useState(0)
    const[users, setUsers] = useState(0)
    const[centers, setCenters] = useState(0)

    useEffect(() => {
        fetchData();
      }, []); 
    return <>
        <ul className="nav-menu">
            <li className="nav-menu__option"></li>
            <li className="nav-menu__option"></li>
            <li className="nav-menu__option"></li>
            <li className="nav-menu__option"></li>
        </ul>
    </>
}