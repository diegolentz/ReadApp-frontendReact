export type LoginRequest = {
    username: string
    password: string
}
export type LoginResponse = {
    userID : number
}

export class User {
    constructor(
        private username: string,
        private password: string
    ){}
    
    buildLoginRequest(): LoginRequest {
        return {
            username: this.username,
            password: this.password
        }
    }
}
