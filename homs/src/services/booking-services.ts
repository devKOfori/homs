import apiClient from "../api-client";
import { Booking } from "../contexts/BookingProvider";

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

  createBooking(booking: Booking) {
    const request = apiClient.post("/bookings/", booking, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
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
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getIdentificationTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/identification-types/", {
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
