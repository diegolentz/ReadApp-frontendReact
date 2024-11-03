import axios from "axios";
import { REST_SERVER_URL } from "../constants";
import { LoginRequest } from "../domain/loginJSON";

class UserService {
    loggedUserId!: number;

    async login(loginRequest: LoginRequest): Promise<number> {
        try {
            const response = await axios.post(`${REST_SERVER_URL}/login`, loginRequest);
            console.log(response.data); // Muestra la respuesta completa en la consola

            // Asumiendo que el ID está en response.data.id
            if (response.data && response.data.id) {
                this.loggedUserId = response.data.id;
                localStorage.setItem("IdUser",this.loggedUserId.toString()) // Guarda el ID si es necesario
                return this.loggedUserId;
            } else {
                throw new Error('No se recibió un ID en la respuesta');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error en el login:', error.response?.data || error.message);
            } else {
                console.error('Error desconocido:', error);
            }
            return 0; // O lanza el error según tu preferencia
        }
    }
}

export const userService = new UserService();
