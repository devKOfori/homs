import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import FrontdeskDashboard from '../dashboards/FrontdeskDashboard';
import HousekeepingDashboard from '../dashboards/HousekeepingDashboard';
import { Route, Routes } from 'react-router-dom';
import RoomCategories from './RoomCategories';
import { RoomType } from '../components/RoomTypeList';
import { Category } from '../components/RoomCategoriesList';
import { Amenity } from '../hooks/useAmenities';
import roomService from '../services/room-service';
import { CanceledError } from 'axios';
import amenityService from '../services/amenity-service';

const Dashboard = () => {

    useEffect(()=>{
        const { request, cancel } = roomService.getRoomTypes()
        request.then((response)=>{
            localStorage.setItem('roomTypes', JSON.stringify(response.data))
            console.log(response.data)
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
        return ()=>cancel();
    }, [])

    useEffect(()=>{
        const { request, cancel } = roomService.getRoomCategories()
        request.then((response)=>{
            localStorage.setItem('roomCategories', JSON.stringify(response.data))
            console.log(response.data)
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
        return ()=>cancel();
    }, [])

    useEffect(()=>{
        const { request, cancel } = amenityService.getAmenities()
        request.then((response)=>{
            localStorage.setItem('amenities', JSON.stringify(response.data))
            console.log(response.data)
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
        return ()=>cancel();
    }, [])

    useEffect(()=>{
        const { request, cancel } = roomService.getFloors();
        request.then((response)=>{
            localStorage.setItem('floors', JSON.stringify(response.data))
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
    }, [])

    useEffect(()=>{
        const { request, cancel } = roomService.getBedTypes();
        request.then((response)=>{
            localStorage.setItem('bedTypes', JSON.stringify(response.data))
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
        return ()=>cancel();
    }, [])
    
    const { department } = useAuth();
    // console.log(`Department: ${department}`)
    switch (department) {
        case 'Frontdesk':
            return <FrontdeskDashboard />
    
        case 'Housekeeping':
            return <HousekeepingDashboard />
    }
}

export default Dashboard
