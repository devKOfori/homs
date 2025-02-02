import apiClient from "../api-client";
import { Category } from "../components/RoomCategoriesList";

class RoomService {
  getRoomCategories() {
    const controller = new AbortController();
    const request = apiClient.get("/room-categories/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomCategory(data: { name: string }) {
    const request = apiClient.post("/room-categories/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  updateRoomCategory(category: Category) {
    const { name, amenities } = category;
    const payload = { name, amenities };
    const request = apiClient.put(`/room-categories/${category.id}/`, payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  deleteRoomCategory(categoryId: string) {
    const request = apiClient.delete(`/room-categories/${categoryId}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  getRoomTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/room-types/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomType(data: any) {
    const request = apiClient.post("/room-types/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  updateRoomType(id: string, data: any) {
    const request = apiClient.put(`/room-types/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  deleteRoomType(id: string) {
    const request = apiClient.delete(`/room-types/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  getFloors() {
    const controller = new AbortController();
    const request = apiClient.get("/floors/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getBedTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/bed-types/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getHotelViews() {
    const controller = new AbortController();
    const request = apiClient.get("/hotel-views/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getRooms() {
    const controller = new AbortController();
    const request = apiClient.get("/rooms/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
}

export default new RoomService();
