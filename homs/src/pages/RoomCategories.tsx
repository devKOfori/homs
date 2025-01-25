import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import RoomCategoriesList, { Category } from '../components/RoomCategoriesList'
import ActionPageHeader from '../components/ActionPageHeader'
import RoomCategoriesForm from '../components/RoomCategoriesForm'
import roomService from '../services/room-service'
import { CanceledError } from 'axios'

const RoomCategories = () => {
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false)
  const [roomCategories, setRoomCategories] = useState<Category[]>([])
  const [updatedCategory, setUpdatedCategory] = useState<Category | null>(null)


  console.log(`edit button clicked: ${isEditButtonClicked}`)
  console.log(`updated category: ${updatedCategory}`)

    useEffect(()=>{
        const { request, cancel } = roomService.getRoomCategories()
        request.then((response)=>{
            setRoomCategories(response.data)
            console.log(response.data)
        })
        request.catch((error)=>{
            if (error instanceof CanceledError) return
            console.log(error.message)
        })
        return ()=>cancel();
    }, [])

    const handleEditCategory = ()=>{
      setShowCategoryForm(true);
    }

    const heading = 'Room Categories'

  return (
    <DashboardLayout>
      <ActionPageHeader 
      heading={heading}  
      setShowCategoryForm={setShowCategoryForm}
      showCategoryForm={showCategoryForm}
      setUpdatedCategory={setUpdatedCategory}
      />
      {
        showCategoryForm ? 
        <RoomCategoriesForm 
        setRoomCategories={setRoomCategories} 
        roomCategories={roomCategories}
        setShowCategoryForm={setShowCategoryForm}
        category={updatedCategory}
        isEditButtonClicked={isEditButtonClicked}
        setIsEditButtonClicked={setIsEditButtonClicked}
        /> : <RoomCategoriesList data={roomCategories} 
          setShowCategoryForm={setShowCategoryForm}
          heading={heading}
          setUpdatedCategory={setUpdatedCategory}
          isEditButtonClicked={isEditButtonClicked}
          setIsEditButtonClicked={setIsEditButtonClicked}
          setRoomCategories = {setRoomCategories}
        />
      }
    </DashboardLayout>
  )
}

export default RoomCategories
