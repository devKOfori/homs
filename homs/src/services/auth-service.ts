import { data } from "react-router-dom";
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
    const request = apiClient.post("/accounts/login/", authData);
    return request;
  }

  logout(accessToken: string, refreshToken: string) {
    console.log(`Access token: ${accessToken}`);
    const request = apiClient.post(
      "/accounts/logout/",
      { refresh: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken") ?? ""
          )}`,
        },
      }
    );
    return request;
  }

  resetPassword(username: string, resetChannel: string) {
    const request = apiClient.post("/accounts/reset-password/", {
      username: username,
      reset_channel: resetChannel,
    });
    return request;
  }

  validateResetCode(resetCode: string) {
    const request = apiClient.get("accounts/reset-password/validate-code/", {
      params: { reset_id: resetCode },
    });
    return request;
  }

  resetPasswordNewPassword(
    resetId: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    const request = apiClient.post("/accounts/reset-password/complete/", {
      reset_id: resetId,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    });
    return request;
  }

  getMyDepartmentStaffList() {
    const controller = new AbortController();
    const request = apiClient.get("/accounts/my-department-staff/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new AuthService();
