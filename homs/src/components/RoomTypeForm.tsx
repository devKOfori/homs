import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from './ui/field'
import { HStack, Input, createListCollection } from '@chakra-ui/react'
import { NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'
import { useRoomSetup } from '../contexts/RoomSetupProvider'
import { RoomType } from './RoomTypeList'
import AmenitiesLoad from './AmenitiesLoad'
import { DialogActionTrigger, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "./ui/select"

interface Props {
    roomType: RoomType;
}

const RoomTypeForm = ({ roomType }: Props) => {
    const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([])

    const schema = z.object({
        name: z.string().nonempty('Room Type Name is required'),
        amenities: z.array(z.string()).nonempty('Amenities are required'),
        bedTypes: z.array(z.string()).nonempty('Bed Types are required'),
        view: z.string().nonempty('View is required'),
        areaInMeters: z.number(),
        areaInFeet: z.number(),
        maxGuests: z.number(),
        rate: z.number(),
        roomCategory: z.string()
    })

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: roomType?.name || "",
            amenities: roomType?.amenities || [],
            bedTypes: roomType?.bedTypes || [],
            view: roomType?.view || "",
            areaInMeters: roomType?.areaInMeters || 0,
            areaInFeet: roomType?.areaInFeet || 0,
            maxGuests: roomType?.maxGuests || 0,
            rate: roomType?.rate || 0.0,
            roomCategory: roomType?.roomCategory || ""
        }
    })

    const { bedTypes, amenities, roomCategories, floors, hotelViews } = useRoomSetup()
    console.log(`roomCategories: ${roomCategories}`)
    const onSubmit = (data: RoomType)=>{
        console.log(data)
    }

    // const roomCategoryCollections = createListCollection(roomCategories)
    
  return (
    <form method='POST' onSubmit={handleSubmit(onSubmit)} >
        <Field label='Room Type Name' mb='20px'>
            <Input type='text' px='10px' placeholder='Room Type Name' {...register('name')} />
        </Field>
        <HStack gap='50px'>
            <Field label='Category' mb='20px'>
                
                {/* <SelectRoot collection={roomCategoryCollections} {...register('roomCategory')}>
                    <SelectTrigger>
                        <SelectValueText placeholder='Select Category' />
                    </SelectTrigger>
                    <SelectContent>
                        {
                        roomCategories.map(category=>(
                            <SelectItem key={category.id} item={category}>
                                <SelectLabel>{category.name}</SelectLabel>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot> */}
            </Field>
            <Field label='View' mb='20px'>
                <NativeSelectRoot {...register('roomCategory')}>
                    <NativeSelectField px='10px'
                    items={hotelViews.map(hotelView=>hotelView.name)}
                    />
                </NativeSelectRoot>
            </Field>
        </HStack>
        <HStack gap='50px'>
            <Field label='Area (m)' mb='20px'>
                <Input type='number' px='10px' placeholder='Area in Meters' {...register('areaInMeters')} />
            </Field>
            <Field label='Area (ft)' mb='20px'>
                <Input type='number' px='10px' placeholder='Area in Feet' {...register('areaInFeet')} />
            </Field>
        </HStack>
        <HStack gap='50px'>
            <Field label='Rate' mb='20px'>
                <Input type='number' px='10px' placeholder='Rate' {...register('rate')} />
            </Field>
            <Field label='Max Guests' mb='20px'>
                <Input type='number' px='10px' placeholder='Max Guests' {...register('maxGuests')} />
            </Field>
        </HStack>
        <Field label='Amenities' mb='20px'>
            <AmenitiesLoad data={amenities} selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities} />
        </Field>
        <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline" px='25px' bg='red.500'>Cancel</Button>
            </DialogActionTrigger>
            <Button type='submit' bg='#473647' color='white' px='25px'>Save</Button>
        </DialogFooter>
    </form>
  )
}

export default RoomTypeForm
