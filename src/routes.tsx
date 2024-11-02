import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Dashboard } from './componentes/dashboard/Dashboard'
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout'
import { AuthorPage } from './componentes/FolderAuthor/AuthorPage/AuthorPage'
import { Login } from './componentes/login/login'

export const AppRoutes = () =>
    <Router>
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='home' element={<ViewLayoutComponent />}>
                {/* ESTO ES PARA QUE /home me muestre el dashboard por default */}
                <Route index element={<Navigate to='dashboard' replace />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='author' element={<AuthorPage />} />
                {/*  ACA FALTA COMPLETAR CON LIBROS*/}
                {/* <Route path='dashboard' element={<Dashboard />} /> */}
            </Route>

            {/* ESTO ES PARA QUE /ruta-banana rediriga al login */}
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    </Router>


