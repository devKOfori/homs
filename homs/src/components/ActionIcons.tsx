import { Box, HStack, VStack, Text, Container, Heading, Flex } from '@chakra-ui/react'
import React from 'react'
import { Button } from './ui/button'
import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import CustomDialogHeader from './CustomDialogHeader'
import RoomTypeDetails from './RoomTypeDetails'
import RoomTypeViewDialog from './RoomTypeViewDialog'
import CreateRecordDialog from './CreateRecordDialog'
import EditRecordDialog from './EditRecordDialog'

  interface RoomType {
    id: string;
    name: string;
    amenities: string[] | null;
    bed_types: string[] | null;
    view: string | null;
    area_in_meters: number;
    area_in_feet: number;
    max_guests: number;
    rate: number;
  }

  interface Props {
    roomtype: RoomType;
  }

const ActionIcons = ({ roomtype }: Props) => {
    const editDialogTrigger = (
        <Button size='xs'
            _hover={{
                transform: 'scale(1.03) translateY(-2px)',
                transition: 'transform 0.3s ease-out',
                bg: '#DDDCDD',
                border: '1px solid #473647',
            }}>
                <FaPen color='#473647' />
            </Button>
    )
    const deleteDialogTrigger = (
        <Button size='xs'
            _hover={{
                transform: 'scale(1.03) translateY(-2px)',
                transition: 'transform 0.3s ease-out',
                bg: '#DDDCDD',
                border: '1px solid #473647',
            }}>
                <FaTrash color='#473647' />
            </Button>
    )
  return (
        <HStack>
            <RoomTypeViewDialog roomtype={roomtype} />
            <EditRecordDialog roomType={roomtype} />
            <CreateRecordDialog table='roomtype' dialogTrigger={deleteDialogTrigger} />
        </HStack>
  )
}

export default ActionIcons
