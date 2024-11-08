import axios from "axios"
import { REST_SERVER_URL } from "../constants"
import {  DashboardJSON, DashboardJson } from "../domain/DashboardJSON"

class DashboardService{

    async getDashboardData():Promise<DashboardJSON>{
        const data =  await axios.get(REST_SERVER_URL + "/dashboard")
        return DashboardJson.fromJson(data.data)
    }

    async deleteCenters(){
        await axios.post(REST_SERVER_URL + "/borrarCentrosInactivos")
    }

    async deleteUsers(){
        await axios.post(REST_SERVER_URL + "/borrarUsuariosInactivos");
        
    }

}

export const dashboardService = new DashboardService()