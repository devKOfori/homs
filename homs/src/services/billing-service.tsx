import apiClient from "../api-client";

class BillingService {
  getSponsors() {
    const controller = new AbortController();
    const request = apiClient.get("/sponsors/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getSponsorTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/sponsor-types/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getPaymentTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/payment-types/", {
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

export default new BillingService();
