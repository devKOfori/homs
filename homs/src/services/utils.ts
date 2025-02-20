import hotelService from "./hotel-service";

class HotelUtils {
    updateTaskStatus (taskType: string, taskId: string, status: string) {
        switch (taskType) {
            case "houseKeeping":
                const request = hotelService.updateRoomCleaningTaskStatus(
                    taskId,
                    status
                )
                return request;
        
            default:
                break;
        }
    }
}

export default new HotelUtils();