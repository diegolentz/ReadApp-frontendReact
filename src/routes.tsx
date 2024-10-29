import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


export const NavigationMenuRoutes = () => 
    <Routes>
        <Route path="/home" element={<TareasComponent/>} />
        <Route path="/authors/:id" element={<TareasComponent/>} />
        <Route path="/books/:id" element={<AsignarTareaComponent/>} />
        <Route path="/login" element={<AsignarTareaComponent/>} />
    </Routes>

export const NavigationMenuRouter = () => 
    <Router>
        <NavigationMenuRoutes/>
    </Router>