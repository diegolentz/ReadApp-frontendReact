import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './componentes/dashboard/Dashboard';
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout';
import { Login } from './componentes/login/login';
import { AuthorManager } from './componentes/FolderAuthor/AuthorManager/AuthorManager';
import { paths } from './domain/routes';
import { BooksView } from './componentes/Book/BooksView';
import BookDetail from './componentes/BookCreation/BookDetail';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path={`${paths.login}`} element={<Login />} />

            <Route element={<ViewLayoutComponent />}>
                <Route path={`${paths.dashboard}`} element={<Dashboard />} />
                <Route path={`${paths.author}/list`} element={<AuthorManager view="list" />} />
                <Route path={`${paths.author}/create`} element={<AuthorManager view="create" />} />
                <Route path={`${paths.author}/edit/:id`} element={<AuthorManager view="edit" />} />
                <Route path={`${paths.author}/show/:id`} element={<AuthorManager view="show" />} />
                <Route path={`${paths.books}`} element={<BooksView/>} />
                <Route path={`${paths.books}/creation`} element={<BookDetail editable= {true} emptyForm={true}/>} />
                <Route path={`${paths.books}/display/:id`} element={<BookDetail editable= {false} emptyForm={false}/>} />
                <Route path={`${paths.books}/edit/:id`} element={<BookDetail editable= {true} emptyForm={false}/>} />

            </Route>

            <Route path="*" element={<Navigate to={`${paths.login}`} replace />} />
        </Routes>
    </Router>
);
