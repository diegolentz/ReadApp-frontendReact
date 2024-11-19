

export const PathTestId = {
    login: 'login',
    dashboard: 'dashboard',
    author: 'author',
    books: 'books',
}

export const mainPaths = {
    login: `/${PathTestId.login}`,
    dashboard: `/${PathTestId.dashboard}`,
    author: `/${PathTestId.author}`,
    books: `/${PathTestId.books}`,
}

export const paths = {
    login: {
        path: `${mainPaths.login}`,
        label: 'Login'
    },
    dashboard: {
        path: `${mainPaths.dashboard}`,
        label: 'Dashboard'
    },
    author: {
        list:{
            path:`${mainPaths.author}/list`,
            label: `List of authors`
        },
        create:{
            path:`${mainPaths.author}/create`,
            label: `Create author`
        },
        edit:{
            path:`${mainPaths.author}/edit`,
            label: `Edit author`
        },
        show:{
            path:`${mainPaths.author}/show`,
            label: `Author details`
        }
    },
    books: {
        create:{
            path:`${mainPaths.books}/display`,
            label: `List of books`
        },
        display:{
            path:`${mainPaths.books}/creation`,
            label: `Create book`
        },
        edit:{
            path:`${mainPaths.books}/edit`,
            label: `Edit book`
        }
    }
}



// export const PathToLabelMap = {

//     [paths.dashboard.path]: paths.dashboard.label,

//     [paths.author.list.path]: paths.author.list.label,

//     [paths.author.create.path]: paths.author.label,

//     [paths.author.edit.path]: paths.author.label,

//     [paths.author.show.path]: paths.author.label,

//     [`${paths.author}/show/:id`]: paths.author.label,

//     [paths.books]: paths.books.label,

//     [`${paths.books}/creation`]: paths.books.label,

//     [`${paths.books}/display/:id`]: paths.books.label,

//     [`${paths.books}/edit/:id`]: paths.books.label,

// };