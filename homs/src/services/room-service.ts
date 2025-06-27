import apiClient from "../api-client";
import { Category } from "../components/RoomCategoriesList";
import { RoomRate } from "../components/RoomRateList";

class RoomService {
  getRoomCategories() {
    const controller = new AbortController();
    const request = apiClient.get("/room-categories/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomCategory(data: { name: string }) {
    const request = apiClient.post("/room-categories/add/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateRoomCategory(categoryID: string, category: Category) {
    // const { name, amenities } = category;
    // const payload = {
    //   name,
    //   amenities: amenities || [], // Ensure amenities is an array
    //   room_area: category.room_area || 0, // Optional field
    //   description: category.description || "", // Optional field
    // };
    const request = apiClient.put(
      `/room-categories/${category.id}/edit/`,
      category,
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

  deleteRoomCategory(categoryId: string) {
    const request = apiClient.delete(`/room-categories/${categoryId}/edit/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
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
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomType(data: any) {
    const request = apiClient.post(
      "/room-types/add/",
      {
        name: data.name,
        max_occupancy: data.maxOccupancy,
        base_price: data.basePrice,
      },
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

  updateRoomType(id: string, data: any) {
    console.log("Updating room type with ID:", id);
    console.log("Data to update:", data);
    const request = apiClient.put(
      `/room-types/${id}/edit/`,
      {
        name: data.name,
        max_occupancy: data.maxOccupancy,
        base_price: data.basePrice,
      },
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

  deleteRoomType(id: string) {
    const request = apiClient.delete(`/room-types/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
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
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createFloor(data: any) {
    const request = apiClient.post("/floors/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateFloor(id: string, data: any) {
    const request = apiClient.put(`/floors/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteFloor(id: string) {
    const request = apiClient.delete(`/floors/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getBedTypes() {
    const controller = new AbortController();
    const request = apiClient.get("/bedtypes/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createBedType(data: any) {
    const request = apiClient.post("/bedtypes/add/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateBedType(id: string, data: any) {
    const request = apiClient.put(`/bedtypes/${id}/edit/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteBedType(id: string) {
    const request = apiClient.delete(`/bedtypes/${id}/edit/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getHotelViews() {
    const controller = new AbortController();
    const request = apiClient.get("/hotel-views/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createHotelView(data: any) {
    const request = apiClient.post("/hotel-views/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateHotelView(id: string, data: any) {
    const request = apiClient.put(`/hotel-views/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteHotelView(id: string) {
    const request = apiClient.delete(`/hotel-views/${id}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getAmenities() {
    const controller = new AbortController();
    const request = apiClient.get("/amenities/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createAmenity(data: any) {
    const request = apiClient.post("/amenities/add/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateAmenity(id: string, data: any) {
    const request = apiClient.put(`/amenities/${id}/edit/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteAmenity(id: string) {
    const request = apiClient.delete(`/amenities/${id}/edit/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getRooms(params?: { room_category?: string; room_type?: string }) {
    const controller = new AbortController();
    const request = apiClient.get("/rooms/", {
      signal: controller.signal,
      params: params,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getActiveRate(params: {
    roomType?: string;
    roomCategory?: string;
    roomview?: string;
    floor?: string;
    checkInDate?: string;
  }) {
    console.log("params:", params);
    const controller = new AbortController();
    const request = apiClient.get("/rooms/get-active-rate/", {
      signal: controller.signal,
      params: {
        room_type: params?.roomType ?? null,
        room_category: params?.roomCategory ?? null,
        check_in_date: params?.checkInDate ?? null,
        floor: params?.floor ?? null,
        room_view: params?.roomview ?? null,
      },
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoom(data: any) {
    const request = apiClient.post("/rooms/add/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateRoom(id: string, data: any) {
    const request = apiClient.put(`/rooms/${id}/edit/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteRoom(id: string) {
    const request = apiClient.delete(`/rooms/${id}/edit/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getRoomRates() {
    const controller = new AbortController();
    const request = apiClient.get("/room-rates/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomRate(data: any) {
    const request = apiClient.post("/room-rates/add/", data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }
  updateRoomRate(id: string, data: any) {
    const request = apiClient.put(`/room-rates/${id}/edit/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }
  deleteRoomRate(id: string) {
    const request = apiClient.delete(`/room-rates/${id}/edit/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }
}

export default new RoomService();
