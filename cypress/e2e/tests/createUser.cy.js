/// <reference types="cypress" />
import { getByDataTestId } from "../../utils.cy"

describe("Crear usuario", function(){
    it("Presionar botón de crear usuario", function() {
        cy.visit('/')
        getByDataTestId('new-account-btn').click()

    })
})