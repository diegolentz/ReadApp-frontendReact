/// <reference types="cypress" />
import { getByDataTestId } from "../../utils.cy"

describe("Login succesfull", function() {
    it("Vamos a ver si dice Hola Mundo", () => {
        cy.viewport('iphone-6') // Set viewport to 375px x 667px
        cy.visit('/')
        getByDataTestId('input-username').type('adrian')
        getByDataTestId('input-password').type('adrian')
        getByDataTestId('try-login').click()
        cy.url().should('match', /dashboard/)
    //   expect(saludo === "Hola Mundo").to.equal(true)
    })
  })