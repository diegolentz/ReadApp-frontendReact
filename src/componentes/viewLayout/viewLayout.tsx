import { ThemeProvider } from '@emotion/react'
import { NavButtonsComponent } from '../FolderButtons/navButtons/navButtons'
import { HeaderComponent } from '../header/header'
import './viewLayout.css'
import { Outlet } from 'react-router-dom'

export const ViewLayoutComponent = ({ selectedOption }: { selectedOption: string }) => (
    <>
        <HeaderComponent currentOption={selectedOption} data-testid={"header"}></HeaderComponent>
        <div className='content' data-testid={"content"}>
            <Outlet></Outlet>
        </div>
        <NavButtonsComponent data-testid={"nav-buttons"}></NavButtonsComponent>

    </>
)

