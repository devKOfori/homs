import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import ActionPageHeader from '../components/ActionPageHeader'
import RoomTypeList, { RoomType } from '../components/RoomTypeList'
import roomService from '../services/room-service'
import { CanceledError } from 'axios'


const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [showRoomTypeForm, setShowRoomTypeForm] = useState<boolean>(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false)
  const [updatedRoomType, setUpdatedRoomType] = useState<RoomType | null>(null)
  const [roomType, setRoomType] = useState<RoomType | null>(null)


  useEffect(()=>{
    const { request, cancel } = roomService.getRoomTypes()
    request.then((response)=>{
      setRoomTypes(response.data)
      console.log(response.data)
    })
    request.catch((error)=>{
      if (error instanceof CanceledError) return
      console.log(error.message)
    })
    return ()=>cancel();
  }, [])

  roomTypes.map((roomType)=>console.log(roomType.amenities))

  const heading = 'Room Types'
  return (
    <DashboardLayout>
      <ActionPageHeader heading='Room Type' />
      <RoomTypeList
        data={roomTypes}
        heading={heading}
        setShowRoomTypeForm={setShowRoomTypeForm}
        isEditButtonClicked={isEditButtonClicked}
        setIsEditButtonClicked={setIsEditButtonClicked}
        setUpdatedRoomType={setUpdatedRoomType}
        roomType={roomType}
        setRoomRoomTypes={setRoomTypes}
      />
    </DashboardLayout>
  )
}

export default RoomTypes
