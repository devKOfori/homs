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

  getShiftDetails(assignmentId: string) {
    const controller = new AbortController();
    const request = apiClient.get(`shift-management/${assignmentId}/`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  getShiftStaff(
    shiftDate: string,
    shiftId: string,
    excludeInactive: boolean = false
  ) {
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

  getHouseKeepingTasks(
    shiftId?: string,
    employeeName?: string,
    roomNumber?: string,
    shiftName?: string,
    status?: string,
    priority?: string,
    assignedOn?: string,
    userTasksOnly?: boolean
  ) {
    const controller = new AbortController();
    const request = apiClient.get("house-keeping/assign/", {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken") ?? ""
        )}`,
      },
      params: {
        shiftId,
        employeeName,
        roomNumber,
        shiftName,
        status,
        priority,
        assignedOn,
        userTasksOnly,
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
    roomNumber: string,
    shift: string,
    date: string,
    staffProfile: string,
    priority: string,
    taskDescription: string,
    status: boolean,
    taskSupported?: string
  ) {
    const payload = {
      room: roomNumber,
      assignment_date: date,
      shift: shift,
      assigned_to: staffProfile,
      priority: priority,
      description: taskDescription,
      status_2: status,
      task_supported: taskSupported,
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

  updateRoomCleaningTaskStatus(id: string, status: string) {
    const request = apiClient.post(
      `house-keeping/${id}/change-status/`,
      { status },
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
