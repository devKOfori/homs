import apiClient from "../api-client";
import { Inputs } from "../pages/Login";

// interface UserAuthenticationResponse {
//     refresh: string;
//     access: string;
//     department: string;
//     roles: string[];
// }


class AuthService {
    login(authData: Inputs) {
        const request = apiClient.post('/token/', authData)
        return request
    }

    logout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('department')
        localStorage.removeItem('roles')
    }

    getMyDepartmentStaffList() {
        const controller = new AbortController();
        const request = apiClient.get('/accounts/my-department-staff/', {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')??'')}`
            }
        })
        return { request, cancel: () => controller.abort() }
    }
}

export default new AuthService();
