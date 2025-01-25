import { Box, Container, Flex, Input } from '@chakra-ui/react'
import { Field } from './ui/field'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import roomService from '../services/room-service'
import { Category } from './RoomCategoriesList'
import amenityService from '../services/amenity-service'

interface Props {
  setShowCategoryForm: (value: boolean)=>void;
  setRoomCategories: (value: Category[])=>void
  roomCategories: Category[]
  category: Category | null
  isEditButtonClicked: boolean
  setIsEditButtonClicked: (value: boolean)=>void
}

interface Amenity {
  id: string;
  name: string;
}

type Inputs = {
  name: string
}
const RoomCategoriesForm = (
  { 
    setRoomCategories, 
    roomCategories, 
    setShowCategoryForm, 
    category,
    isEditButtonClicked,
    setIsEditButtonClicked
  }: Props) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])

  useEffect(()=>{
    const { request, cancel } = amenityService.getAmenities();
    request.then((response)=>{
      setAmenities(response.data)
      console.log(response.data)
    })
    request.catch((error)=>{
      console.log(error.message)
    })
    return ()=>cancel()
  }, [])

  const schema = z.object({
    name: z.string().nonempty('Category Name is required')
  })

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || "",
    },
  })

  const onSubmit = (data: Category) => {
    console.log(`isEditButtonClicked: ${isEditButtonClicked}`)
    data.amenities = selectedAmenities
    var request;
    if (isEditButtonClicked) { 
      data.id = category?.id || ''
      console.log(`data: ${data.id}`)
      setRoomCategories((prev)=>prev.map((category)=>category.id===data.id ? data : category))
      request = roomService.updateRoomCategory(data)
    } else {   
      console.log(`data: ${data}`)
      // setRoomCategories((prev)=>[...prev, data])
      request = roomService.createRoomCategory(data)
    }
    request.then((response)=>{
      console.log(response.data)
      // setIsAddNewButtonClicked(false)
      setRoomCategories((prev)=>[...prev, data])
      setShowCategoryForm(false)
    })
    request.catch((error)=>{
      setRoomCategories(roomCategories)
      console.log(error.message)
    })
    request.finally(()=>setIsEditButtonClicked(false))
  }

  const handleAmenitySelect = (name: string)=>{
    console.log('button clicked')
    setSelectedAmenities(
      (prev)=>prev.includes(name) ? 
      prev.filter((amenity)=>amenity!==name) 
      : [...prev, name])
  }

  return (
    <div>
      <h1>Add Room Category</h1>
      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <Field label='Category Name'>
            <Input type='text' placeholder='Category Name' {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
        </Field>
        <Box>
          <h2>Amenities</h2>
          <Flex gap='10px'>
          {amenities.map((amenity)=>(
              <Button variant={selectedAmenities.includes(amenity.name) ? 'solid' : 'outline' } onClick={()=>handleAmenitySelect(amenity.name)} key={amenity.id}>
                {amenity.name}
              </Button>
          ))}
          </Flex>
        </Box>
        <Button type='submit' disabled={!isValid}>Save</Button>
        <Button onClick={()=>setShowCategoryForm(false)}>Cancel</Button>
      </form>
    </div>
  )
}

export default RoomCategoriesForm
