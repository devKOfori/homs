import { createContext, useContext, useEffect, useState } from "react";


const RoomSetupContext = createContext();

export function RoomSetupProvider ({ children }) {
    const [roomCategories, setRoomCategories] = useState(localStorage.getItem('roomCategories') ? JSON.parse(localStorage.getItem('roomCategories')) : []);
    const [roomTypes, setRoomTypes] = useState(localStorage.getItem('roomTypes') ? JSON.parse(localStorage.getItem('roomTypes')) : []);
    const [floors, setFloors] = useState(localStorage.getItem('floors') ? JSON.parse(localStorage.getItem('floors')) : []);
    const [bedTypes, setBedTypes] = useState(localStorage.getItem('bedTypes') ? JSON.parse(localStorage.getItem('bedTypes')) : []);
    const [amenities, setAmenities] = useState(localStorage.getItem('amenities') ? JSON.parse(localStorage.getItem('amenities')) : []);
    const [hotelViews, setHotelViews] = useState(localStorage.getItem('hotelViews') ? JSON.parse(localStorage.getItem('hotelViews')) : []);

    const updateRoomCategories = (data) => {
        setRoomCategories((prev)=>[...prev, data])
    }

    const updateRoomTypes = (data) => {
        setRoomTypes((prev)=>[...prev, data])
    }

    const updateFloors = (data) => {
        setFloors((prev)=>[...prev, data])
    }

    const updateBedTypes = (data) => {
        setBedTypes((prev)=>[...prev, data])
    }

    const updateAmenities = (data) => {
        setAmenities((prev)=>[...prev, data])
    }

    const updateHotelViews = (data) => {
        setHotelViews((prev)=>[...prev, data])
    }

    return (
        <RoomSetupContext.Provider value={{roomCategories, roomTypes, floors, bedTypes, amenities, hotelViews, updateRoomCategories, updateRoomTypes, updateFloors, updateBedTypes, updateAmenities, updateHotelViews}}>
            { children }
        </RoomSetupContext.Provider>
    )
}

export const useRoomSetup = () => {
    return useContext(RoomSetupContext)
}