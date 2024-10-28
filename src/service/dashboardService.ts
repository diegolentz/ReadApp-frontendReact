import axios from "axios"
import { REST_SERVER_URL } from "../constants"
import {  DashboardJSON, DashboardJson } from "../domain/DashboardJson"

class DashboardService{

    async getDashboardData():Promise<DashboardJSON>{
        const data =  await axios.get(REST_SERVER_URL + "/dashboard")
        return DashboardJson.fromJson(data.data)
    }


}

export const dashboardService = new DashboardService()