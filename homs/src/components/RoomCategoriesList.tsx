import React, { useEffect, useState } from 'react'
import roomService from '../services/room-service'
import { CanceledError } from 'axios'
import { Container, HStack, Icon, IconButton, Text, Table, VStack, Heading } from '@chakra-ui/react'
import { Checkbox } from './ui/checkbox'
import { BsTools } from 'react-icons/bs'
import { Tooltip } from './ui/tooltip'
import { BiTrash } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import RoomCategories from '../pages/RoomCategories'
import ActionIcons from './ActionIcons'


export interface Category{
    id: string;
    name: string;
    amenities: string[] | null;
}

interface Props {
    data: Category[];
    heading: string;
    setShowCategoryForm: (value: boolean)=>void;
    isEditButtonClicked: boolean;
    setIsEditButtonClicked: (value: boolean)=>void;
    setUpdatedCategory: (category: Category | null)=>void;
    category: Category | null;
    setRoomCategories: (value: Category[])=>void;
}

const RoomCategoriesList = (
    { 
        data, 
        heading,
        setShowCategoryForm, 
        setIsEditButtonClicked,
        setUpdatedCategory, 
        category,
        setRoomCategories 
    }: Props
    ) => {
    const [selection, setSelection] = useState<string[]>([])

    const handleCategoryEdit = (category: {id: string, name: string})=>{
        console.log(`category.id: ${category.id}`);
        console.log(`category.name: ${category.name}`)
        setShowCategoryForm((prev)=>!prev)
        setIsEditButtonClicked(true)
        setUpdatedCategory(category)
    }

    const handleCategoryDelete = (category: {id: string, name: string})=>{
        const request = roomService.deleteRoomCategory(category.id)
        request.then((response)=>{
            console.log(`category deleted: ${category.name}`)
            setRoomCategories((prev)=>prev.filter((cat)=>cat.id !== category.id))
        })
        request.catch((error)=>{
            console.log(error.message)
            setRoomCategories(data)
        })
    }

    return (
        <>
            <Table.Root my='50px' interactive>
                <Table.Header>
                    <Table.Row bg='#473647' color='white'>
                        <Table.ColumnHeader px='30px' py='20px'>Category</Table.ColumnHeader>
                        <Table.ColumnHeader ></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((category)=>(
                        <Table.Row key={category.id} bg='white'>
                            <Table.Cell px='30px' py='5px'>{category.name}</Table.Cell>
                            <Table.Cell px='30px' py='5px'>
                                <HStack justifyContent='flex-end'>
                                    <Tooltip content='Manage Amenities'>
                                    <IconButton 
                                    size={'xs'} 
                                    onClick={()=>console.log('icon clicked')} 
                                    color='#473647'
                                    _hover={
                                        {
                                            transform: 'scale(1.1)',
                                            border: '1px solid #473647',
                                            bg: '#DDDCDD'
                                        }
                                    }
                                    >
                                        <BsTools />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip content='Edit Category'>
                                    <IconButton 
                                    size={'xs'} 
                                    onClick={()=>handleCategoryEdit(category)} 
                                    color='#473647'
                                    _hover={
                                        {
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease-out',
                                            border: '1px solid #473647',
                                            bg: '#DDDCDD'
                                        }
                                    }
                                    >
                                        <MdEdit />
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip content='Delete Category'>
                                    <IconButton 
                                    size={'xs'} 
                                    onClick={()=>handleCategoryDelete(category)} 
                                    color='#473647'
                                    _hover={
                                        {
                                            transform: 'scale(1.1)',
                                            border: '1px solid #473647',
                                            bg: '#DDDCDD'
                                        }
                                    }
                                    >
                                        <BiTrash />
                                    </IconButton>
                                    </Tooltip>
                                </HStack>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <HStack my='20px'><Text fontSize='15px' color='#473647' fontWeight='bold'>{data.length}</Text><Text>{heading}</Text></HStack>
            </Table.Root>
        </>
    )
}

export default RoomCategoriesList
