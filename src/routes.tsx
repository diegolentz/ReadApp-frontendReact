import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Dashboard } from './componentes/dashboard/Dashboard'
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout'
import { Login } from './componentes/login/login'
import { AuthorPage } from './componentes/FolderAuthor/AuthorPage/AuthorPage'
import { AuthorEdit } from './componentes/FolderAuthor/AuthorEdit/AuthorEdit'
import { paths } from './domain/routes'
import { BooksView } from './componentes/Book/BooksView'



export const AppRouter = () =>
    <Router>
        <Routes>
            <Route path={`${paths.login}`} element={<Login />} />
            
            <Route element={<ViewLayoutComponent />}>
                <Route path={`${paths.dashboard}`} element={<Dashboard />} />
                <Route path={`${paths.author}`} element={<AuthorPage/>} />
                <Route path={`${paths.author}/edit/:id`} element={<AuthorEdit/>} />
                <Route path={`${paths.books}`} element={<BooksView/>} />
            </Route>

            {/* ESTO ES PARA QUE /ruta-banana rediriga al login */}
            <Route path='*' element={<Navigate to={`${paths.login}`} replace />} />
        </Routes>
    </Router>



