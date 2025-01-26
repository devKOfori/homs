import React, { useEffect, useState } from 'react'
import roomService from '../services/room-service'
import { CanceledError } from 'axios'
import { Container, HStack, Icon, IconButton, Text, Table, VStack, Heading, Flex } from '@chakra-ui/react'
import { Checkbox } from './ui/checkbox'
import { BsTools } from 'react-icons/bs'
import { Tooltip } from './ui/tooltip'
import { BiTrash } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import RoomCategories from '../pages/RoomCategories'
import ActionIcons from './ActionIcons'
import DataTable from './DataTable'
import { FaEye } from 'react-icons/fa'
import { Button } from './ui/button'


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
                <Table.Root mt='50px' mb='20px' size='sm' interactive>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader bg='var(--darkened-bg-2)' color='black' p='10px'>Category</Table.ColumnHeader>
                            <Table.ColumnHeader bg='var(--darkened-bg-2)' color='black' p='10px'></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.map((category)=>(
                            <Table.Row key={category.id} bg='white'>
                                <Table.Cell px='30px' py='5px'>{category.name}</Table.Cell>
                                <Table.Cell px='30px' py='5px'>
                                    <Flex justifyContent={'flex-end'} w={'100%'}>
                                        <Tooltip content={`View ${heading}`}>
                                        <Button 
                                        size={'xs'} 
                                        onClick={()=>console.log('icon clicked')} 
                                        _hover={
                                            {
                                                transform: 'scale(1.1)',
                                                border: '1px solid var(--darkened-bg-2)',
                                                bg: 'var(--darkened-bg)'
                                            }
                                        }
                                        >
                                            <FaEye />
                                        </Button>
                                        </Tooltip>
                                        <Tooltip content='Edit Category'>
                                        <IconButton 
                                        size={'xs'} 
                                        _hover={
                                            {
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.3s ease-out',
                                                border: '1px solid var(--darkened-bg-2)',
                                                bg: 'var(--darkened-bg)'
                                            }
                                        }
                                        >
                                            <MdEdit />
                                        </IconButton>
                                        </Tooltip>
                                        <Tooltip content='Delete Category'>
                                        <IconButton 
                                        size={'xs'} 
                                        _hover={
                                            {
                                                transform: 'scale(1.1)',
                                                border: '1px solid var(--darkened-bg-2)',
                                                bg: 'var(--darkened-bg)'
                                            }
                                        }
                                        >
                                            <BiTrash />
                                        </IconButton>
                                        </Tooltip>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <HStack>
                    <Text>{data.length}</Text>
                    <Text>
                        {
                            heading.endsWith('y')?`${heading.slice(0, -1)}ies`:''
                        }
                    </Text>
                </HStack>
        </>
    )
}

export default RoomCategoriesList
