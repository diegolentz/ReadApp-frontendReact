import axios from "axios"
import { REST_SERVER_URL } from "../constants"
import { LoginRequest } from "../domain/loginJSON"


class UserService {
    loggedUserId!: number    
    

    async login(loginRequest: LoginRequest){
         
        return await axios.post(`${REST_SERVER_URL}/login`,loginRequest)
        
    }
}

export const userService = new UserService()