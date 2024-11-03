import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { LoginRequest, LoginResponse } from "../domain/loginJSON";

class UserService {
    loggedUserId!: number;

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const response = await axios.post(`${REST_SERVER_URL}/login`, loginRequest);
        this.loggedUserId = response.data.userID;
        localStorage.setItem("IdUser",this.loggedUserId.toString()) // Guarda el ID si es necesario
        return response.data
    }
}

export const userService = new UserService();
