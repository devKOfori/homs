import apiClient from "../api-client"
import { CanceledError } from "axios";
class AmenityService {
    getRoomAmenities(roomNumber: string, clientName: string) {
        const controller = new AbortController();
        const request = apiClient.get(
            '/room-amenities/', {
                params: {
                    'room_number': roomNumber,
                    'client': clientName
                },
                signal: controller.signal
            }
        )
        return {request, cancel: ()=>controller.abort()}
    }
}

export default new AmenityService()
export {CanceledError}