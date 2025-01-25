import apiClient from "../api-client";
import { Category } from "../components/RoomCategoriesList";

class RoomService {
    getRoomCategories(){
        const controller = new AbortController();
        const request = apiClient.get('/room-categories/', {
            signal: controller.signal, headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return {request, cancel: ()=>controller.abort()}
    }

    createRoomCategory(data: {name: string}){
        const request = apiClient.post('/room-categories/', data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return request
    }

    updateRoomCategory(category: Category) {
        const {name, amenities} = category
        const payload = {name, amenities}
        const request = apiClient.put(`/room-categories/${category.id}/`, payload, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return request
    }

    deleteRoomCategory(categoryId: string){
        const request = apiClient.delete(`/room-categories/${categoryId}/`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return request
    }

    getRoomTypes(){
        const controller = new AbortController();
        const request = apiClient.get('/room-types/', {
            signal: controller.signal, headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return {request, cancel: ()=>controller.abort()}
    }

    getFloors(){
        const controller = new AbortController();
        const request = apiClient.get('/floors/', {
            signal: controller.signal, headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return {request, cancel: ()=>controller.abort()}
    }

    getBedTypes(){
        const controller = new AbortController();
        const request = apiClient.get('/bed-types/', {
            signal: controller.signal, headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return {request, cancel: ()=>controller.abort()}
    }

    getHotelViews(){
        const controller = new AbortController();
        const request = apiClient.get('/hotel-views/', {
            signal: controller.signal, headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        return {request, cancel: ()=>controller.abort()}
    }
}

export default new RoomService()