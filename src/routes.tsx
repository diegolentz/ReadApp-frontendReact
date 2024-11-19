import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Dashboard } from './componentes/dashboard/Dashboard';
import { ViewLayoutComponent } from './componentes/viewLayout/viewLayout';
import { Login } from './componentes/login/login';
import { mainPaths, paths } from './domain/routes';
import { BooksView } from './componentes/Book/BooksView';
import BookDetail from './componentes/BookCreation/BookDetail';
import { AuthorList } from './componentes/FolderAuthor/AuthorList/AuthorList';
import AuthorEdit from './componentes/FolderAuthor/AuthorEdit/AuthorEdit';
import { useEffect, useState } from 'react';


interface HeaderOptionProps {
    title: string;
    stateDispatcher: React.Dispatch<React.SetStateAction<string>>
}

export const AppRoutes = (props: HeaderOptionProps) => {
    const location = useLocation()
    useEffect(() => {
        const path = location.pathname;
        console.log(path)
        if (path === '/dashboard') {
            props.stateDispatcher(paths.dashboard.label);

        } else if (path == paths.author.list.path) {

            props.stateDispatcher(paths.author.list.label);

        } else if (path == paths.books.display.path) {

            props.stateDispatcher(paths.books.display.label);

        } else {

            props.stateDispatcher(paths.login.label); // or any default option

        }

    }, [location]);

    function handleTitle() {

    }
    return <>
        <Routes>
            <Route path={`${paths.login.path}`} element={<Login />} />

            <Route element={<ViewLayoutComponent selectedOption={props.title} />}>
                <Route path={`${paths.dashboard.path}`} element={<Dashboard />} />

                <Route path={`${paths.author.list.path}`} element={<AuthorList />} />
                <Route path={`${paths.author.create.path}`} element={<AuthorEdit editable={true} />} />
                <Route path={`${paths.author.edit.path}/:id`} element={<AuthorEdit editable={true} />} />
                <Route path={`${paths.author.show.path}/:id`} element={<AuthorEdit editable={false} />} />

                <Route path={`${mainPaths.books}`} element={<BooksView />} />
                <Route path={`${paths.books.create.path}`} element={<BookDetail editable={true} emptyForm={true} />} />
                <Route path={`${paths.books.display.path}/:id`} element={<BookDetail editable={false} emptyForm={false} />} />
                <Route path={`${paths.books.edit.path}/:id`} element={<BookDetail editable={true} emptyForm={false} />} />

            </Route>

            <Route path="*" element={<Navigate to={`${paths.login}`} replace />} />
        </Routes>
    </>
};


export const AppRouter = () => {
    const [currentOption, setCurrentOption] = useState(paths.dashboard.label)
    return <>
        <Router>
            <AppRoutes title={currentOption} stateDispatcher={setCurrentOption}></AppRoutes>
        </Router>
    </>
};

function handleTitle() {
    throw new Error('Function not implemented.');
}
