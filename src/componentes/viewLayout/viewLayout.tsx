import { NavButtonsComponent } from '../FolderButtons/navButtons/navButtons'
import { HeaderComponent } from '../header/header'
import './viewLayout.css'
import { Outlet } from 'react-router-dom'

export const ViewLayoutComponent = () => (
    <>
        <HeaderComponent></HeaderComponent>
        <div className='content'>
            <Outlet></Outlet>
        </div>
        <NavButtonsComponent></NavButtonsComponent>

    </>
)

