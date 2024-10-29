import { render, screen } from '@testing-library/react'
import { Dashboard } from "./Dashboard"
import { beforeEach, expect, vi } from 'vitest'
import { DashboardJSON } from '../../domain/DashboardJSON'
import axios from 'axios'

const mockDashboard = new DashboardJSON(10,5,3,8)
beforeEach(() => {
    vi.mock("axios")
    const spyGetAxios = vi.spyOn(axios, 'get')

    spyGetAxios.mockResolvedValueOnce({
        data:  mockDashboard 
      })
})

afterEach(() => {
    vi.clearAllMocks()
 })


describe('Los datos del dashboard se muestran por pantalla', async () => {
    it("La recomendaciones se muestran en pantalla", async () => {
        render(<Dashboard/>)
        const recomendations = await screen.findByTestId("recomendations") //Es importante porque hay que esperar a que el screen se actualiza, para eso sirve el find
        expect(recomendations.textContent).toBe("10")
    })

    it("Los libros se muestran en pantalla", async () => {
        render(<Dashboard/>)
        const recomendations = await screen.findByTestId("books") //Es importante porque hay que esperar a que el screen se actualiza, para eso sirve el find
        expect(recomendations.textContent).toBe("5")
    })
})

