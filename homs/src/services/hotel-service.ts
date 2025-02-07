import dayjs from "dayjs";
import apiClient from "../api-client";

class HotelService {
  getShifts() {
    const controller = new AbortController();
    const request = apiClient.get("/shifts/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }
  assignShiftToEmployee(employeeId: string, shiftId: string, date: string) {
    const payload = {
      profile: employeeId,
      shift: shiftId,
      date: date,
    };
    const request = apiClient.post("shift-management/", payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  removeShiftAssignment(assignmentId: string) {
    const request = apiClient.delete(`shift-management/${assignmentId}/`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getShiftStaff(shiftDate: string, shiftId: string) {
    const controller = new AbortController();
    const request = apiClient.get("shift-assignments/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
      params: {
        shift_date: shiftDate,
        shift: shiftId,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  clearShiftStaff(shiftDate: string, shiftId: string) {
    const request = apiClient.delete("shift-assignments/clear/", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      }
    });
    return request;
  }
}

export default new HotelService();
