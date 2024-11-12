import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../../domain/routes";
import { HeaderComponent } from "./header";


function renderWithBrowserRouter(){
    render(
        <>
        <BrowserRouter>
            <HeaderComponent></HeaderComponent>
        </BrowserRouter>
        </>
    );
}
describe('bottom-menu-navigation', ()=>{

    it('Component rendering - ViewLayout child components truthy', async () => {
        renderWithBrowserRouter()
        
        expect(screen.findByTestId(`header`)).toBeTruthy()
    });

    it('Child component navigation. Button navigates on click', async () => {
        renderWithBrowserRouter()
        
        expect(screen.findByTestId(`link-${paths.dashboard}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.author}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.books}`)).toBeTruthy()
        expect(screen.findByTestId(`link-${paths.login}`)).toBeTruthy()

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