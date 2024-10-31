
import { beforeEach, vi } from 'vitest'
import { DashboardJSON } from '../../domain/DashboardJSON'
import axios from 'axios'





describe('Los datos del dashboard se muestran por pantalla', async () => {
    const mockDashboard = new DashboardJSON(10, 5, 3, 8)
    beforeEach(() => {
        vi.mock("axios")
        const spyGetAxios = vi.spyOn(axios, 'get')

        spyGetAxios.mockResolvedValueOnce({
            data: mockDashboard
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })


})



