import dayjs from "dayjs";
import apiClient from "../api-client";
import { ShiftNote } from "../components/ShiftNoteDialog";

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
      status: "Pending",
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

  updateShiftAssignment(
    assignmentId: string,
    data: { profile: string; shift: string; date: string; status: string }
  ) {
    const request = apiClient.put(`shift-management/${assignmentId}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  updateAssignedShiftStatus(assignedShiftId: string, status: string) {
    console.log(assignedShiftId, status);
    const request = apiClient.post(
      `shift-management/${assignedShiftId}/change-status/`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken") ?? ""
          )}`,
          "Content-Type": "application/json",
        },
      }
    );
    return request;
  }

  getShiftStaff(shiftDate: string, shiftId: string, excludeInactive: boolean = false) {
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
        exclude_inactive_shifts: excludeInactive,
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
      },
    });
    return request;
  }

  getMyShifts() {
    const controller = new AbortController();
    const request = apiClient.get("my-shifts/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  addShiftNote(data: ShiftNote) {
    const request = apiClient.post(
      `shifts/${data.assigned_shift}/notes/`,
      data,
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

  getShiftNote(shiftId: string) {
    const controller = new AbortController();
    const request = apiClient.get(`shifts/${shiftId}/notes/`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  updateShiftNote(noteId: string, data: ShiftNote) {
    const request = apiClient.put(`shifts/notes/${noteId}/`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  getShiftStatuses() {
    const controller = new AbortController();
    const request = apiClient.get("shift-statuses/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getDepartmentShifts(department: string) {
    const controller = new AbortController();
    const request = apiClient.get("shift-assignments/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
      params: {
        department: department,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getHouseKeepingTaskStaffList(
    date: string,
    shift: string,
    room_number: string
  ) {
    const controller = new AbortController();
    const request = apiClient.get("house-keeping/staff", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
      params: {
        date: date,
        shift: shift,
        room_number: room_number,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  createRoomCleaningTask(
    data: {roomNumber: string,
    shift: string,
    date: string,
    staffProfile: string,
    priority: string,
    taskDescription: string}
  ) {
    const payload = {
      room: data.roomNumber,
      assignment_date: data.date,
      shift: data.shift,
      assigned_to: data.staffProfile,
      priority: data.priority,
      description: data.taskDescription,
    };
    const request = apiClient.post("house-keeping/assign/", payload, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return request;
  }

  deleteRoomCleaningTask(
    roomNumber: string,
    shift: string,
    assignmentDate: string,
    assignedTo: string
  ) {}

  getPriorities() {
    const controller = new AbortController();
    const request = apiClient.get("priorities/", {
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

export default new HotelService();
