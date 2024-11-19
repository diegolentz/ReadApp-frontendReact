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
    backgroundColor: 'primary.main',
    height: 70,
    display: 'flex',
    padding: 10,
    gap: 10
}));


export const HeaderComponent = ({ currentOption }: { currentOption: string }) => {

    return <>
        <StyledBoxHeader
            sx={{ bgcolor: 'primary.main' }}
            data-testid="header">
            <StyledSvg></StyledSvg>
            <StyledPaper sx={{ bgcolor: 'secondary.main' }}>
                <Link to={`${paths.dashboard}`}>
                    <h2>ReadApp</h2>
                </Link>
                <h2>/{currentOption}</h2>
            </StyledPaper>
        </StyledBoxHeader>



    </>
}

