import apiClient from "../api-client";
import { CanceledError } from "axios";
import { Inputs } from "../pages/Login";

interface UserAuthenticationResponse {
    refresh: string;
    access: string;
    department: string;
    roles: string[];
}


class AuthService {
    login(authData: Inputs) {
        const request = apiClient.post('/token/', authData)
        return request
    }
}

export default new AuthService();
