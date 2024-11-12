import { render, screen } from "@testing-library/react";
import { NavButtonsComponent } from "./navButtons";
import { paths } from "../../../domain/routes";
import { BrowserRouter } from "react-router-dom";


function renderWithBrowserRouter(){
    render(
        <>
        <BrowserRouter>
            <NavButtonsComponent></NavButtonsComponent>
        </BrowserRouter>
        </>
    );
}
describe('bottom-menu-navigation', ()=>{

    it('Component rendering - Navigation Buttons truthy', () => {
        renderWithBrowserRouter()
        
        expect(screen.findByTestId(`link-${paths.dashboard}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.author}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.books}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.login}`)).toBeTruthy()
    });

    it('Button navigates on click', async () => {
        renderWithBrowserRouter()

        ;(await screen.findByTestId(`link-${paths.dashboard}`)).click()
        expect(window.location.pathname).toBe(`/${paths.dashboard}`)

        ;(await screen.findByTestId(`link-${paths.author}`)).click()
        expect(window.location.pathname).toBe(`/${paths.author}/list`)
       
        ;(await screen.findByTestId(`link-${paths.books}`)).click()
        expect(window.location.pathname).toBe(`/${paths.books}`)

        ;(await screen.findByTestId(`link-${paths.login}`)).click()
        expect(window.location.pathname).toBe(`/${paths.login}`)

    });

    
})