import apiClient from "../api-client";

class BookingService {
  getBookings() {
    const controller = new AbortController();
    const request  = apiClient.get("/bookings/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
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
}

export default new BookingService();
