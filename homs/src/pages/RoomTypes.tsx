import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import ActionPageHeader from '../components/ActionPageHeader'
import RoomTypeList, { RoomType } from '../components/RoomTypeList'
import roomService from '../services/room-service'
import { CanceledError } from 'axios'
import { useRoomSetup } from '../contexts/RoomSetupProvider'


const RoomTypes = () => {
  const { roomTypes, setRoomTypes, updateRoomTypes } = useRoomSetup();


  useEffect(()=>{
    const { request, cancel } = roomService.getRoomTypes()
    request.then((response)=>{
      setRoomTypes(response.data)
    })
    request.catch((error)=>{
      if (error instanceof CanceledError) return
      console.log(error.message)
    })
    return ()=>cancel();
  }, [])

  

  const heading = 'Room Type'
  return (
    <DashboardLayout>
      <ActionPageHeader heading={heading} table='roomtype' />
      <RoomTypeList
        data={roomTypes}
        heading={heading}
      />
    </DashboardLayout>
  )
}

export default RoomTypes
