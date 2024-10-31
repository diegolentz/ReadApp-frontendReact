import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Dashboard } from './componentes/dashboard/Dashboard'
import { NavigationMenuComponent } from './componentes/navigationMenu/navigationMenu'

export const DefaultRoute = () => 
    <Routes>
        <Route path="/" element={<NavigationMenuComponent/>} />
        <Route path="/prueba" element={<Dashboard/>} />
    </Routes>

// export const NavigationMenuRoutes = () => 
//     <Routes>
//         <Route path="/home" element={<TareasComponent/>} />
//         <Route path="/authors/:id" element={<TareasComponent/>} />
//         <Route path="/books/:id" element={<AsignarTareaComponent/>} />
//         <Route path="/login" element={<AsignarTareaComponent/>} />
//     </Routes>


export const AppRouter = () =>
    <Router>
        <DefaultRoute/>
        {/* <NavigationMenuRoutes/> */}
    </Router>