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

  createFloor(data: any) {
    const request = apiClient.post("/floors/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  updateFloor(id: string, data: any) {
    const request = apiClient.put(`/floors/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  deleteFloor(id: string) {
    const request = apiClient.delete(`/floors/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
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

  createHotelView(data: any) {
    const request = apiClient.post("/hotel-views/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  updateHotelView(id: string, data: any) {
    const request = apiClient.put(`/hotel-views/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
  }

  deleteHotelView(id: string) {
    const request = apiClient.delete(`/hotel-views/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    });
    return request;
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
