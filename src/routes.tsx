import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './componentes/dashboard/Dashboard';
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout';
import { Login } from './componentes/login/login';
import { paths } from './domain/routes';
import { BooksView } from './componentes/Book/BooksView';
import BookDetail from './componentes/BookCreation/BookDetail';
import { AuthorList } from './componentes/FolderAuthor/AuthorList/AuthorList';
import AuthorEdit from './componentes/FolderAuthor/AuthorEdit/AuthorEdit';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path={`${paths.login}`} element={<Login />} />

            <Route element={<ViewLayoutComponent />}>
                <Route path={`${paths.dashboard}`} element={<Dashboard />} />
                
                <Route path={`${paths.author}/list`} element={<AuthorList/>} />
                <Route path={`${paths.author}/create`} element={<AuthorEdit editable = {true}/>} />
                <Route path={`${paths.author}/edit/:id`} element={<AuthorEdit editable = {true}/>} />
                <Route path={`${paths.author}/show/:id`} element={<AuthorEdit editable = {false}/>} />
                
                <Route path={`${paths.books}`} element={<BooksView/>} />
                <Route path={`${paths.books}/creation`} element={<BookDetail editable= {true} emptyForm={true}/>} />
                <Route path={`${paths.books}/display/:id`} element={<BookDetail editable= {false} emptyForm={false}/>} />
                <Route path={`${paths.books}/edit/:id`} element={<BookDetail editable= {true} emptyForm={false}/>} />

            </Route>

            <Route path="*" element={<Navigate to={`${paths.login}`} replace />} />
        </Routes>
    </Router>
);
