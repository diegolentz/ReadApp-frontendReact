import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { paths } from '../../domain/routes'
import { regex } from '../../domain/regex'
import styled from '@emotion/styled'
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material'
import { deepOrange, deepPurple, grey, teal } from '@mui/material/colors'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Paper from '@mui/material/Paper';




const StyledPaper = styled(Paper)(({ theme }) => ({
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    padding: 5,
    gap: 5,
    '& a, & h2': {
        height: 35,
    }
}));

const StyledSvg = styled(LibraryBooksOutlinedIcon)(() => ({
    height: 40,
    width: 40,
    color: grey[100]
}));

const StyledBoxHeader = styled(Box)(() => ({
    backgroundColor:'primary.main',
    height: 70,
    display: 'flex',
    padding: 10,
    gap: 10
}));


export const HeaderComponent = () => {
    const location = useLocation()

    useEffect(() => { }, [location.pathname]);

    const resolveSubName = (string: string) => {
        const match = string.match(regex.routeSlash)
        if (match == null) {
            //ESTO ES SOLO PARA EVITAR tener <array || undefined>
            return [""]
        }
        return match
    };

    const concatName = (string: string) => {
        const list = resolveSubName(string)
        if (list.length == 1) {
            return firstToUpperCase(list[0])
        } else if (list.length > 1) {
            return firstToUpperCase(list[0]).concat(" " + list[1])
        }

    };

    const firstToUpperCase = (string: string) => {
        if (!string || typeof string !== 'string') {
            // Necesario para los test, sino insulta por 
            // <undefined>.toUpperCase()
            return '';

        }
        return string[0].toUpperCase().concat(string.slice(1))
    };

    return <>
            <StyledBoxHeader
            sx={{bgcolor:'primary.main'}}
            data-testid="header">
                <StyledSvg></StyledSvg>
                <StyledPaper className='styled-paper' sx={{bgcolor:'secondary.main'}}>
                    <Link to={`${paths.dashboard}`}>
                        <h2>ReadApp/</h2>
                    </Link>
                    <h2>{concatName(location.pathname)}</h2>
                </StyledPaper>
            </StyledBoxHeader>



    </>
}

