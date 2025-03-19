import apiClient from "../api-client";

class BookingService {
  getBookings() {
    const accessToken = localStorage.getItem("accessToken");
    const parsedAccessToken = accessToken ? JSON.parse(accessToken) : "";
    const controller = new AbortController();
    const request = apiClient.get("/bookings/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${parsedAccessToken}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getTitles() {
    const controller = new AbortController();
    const request = apiClient.get("/titles/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getGenders() {
    const controller = new AbortController();
    const request = apiClient.get("/genders/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getCountries() {
    const controller = new AbortController();
    const request = apiClient.get("/countries/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken") ?? "")}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new BookingService();
