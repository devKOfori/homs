import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@chakra-ui/react'
import React from 'react'
import { Button } from './ui/button'
import { FaPen } from 'react-icons/fa'
import CustomDialogHeader from './CustomDialogHeader'
import RoomTypeForm from './RoomTypeForm'
import { RoomType } from './RoomTypeList'

interface Props {
    roomType: RoomType;
}

const EditRecordDialog = ({ roomType }: Props) => {
    return (
        <DialogRoot size='lg' placement='center'>
            <DialogTrigger>
                <Button size='xs'
                _hover={{
                    transform: 'scale(1.2) translateY(-2px)',
                    transition: 'transform 0.3s ease-out',
                    bg: '#DDDCDD',
                    border: '1px solid #473647',
    
                }}>
                    <FaPen color='#473647'/>
                </Button>
            </DialogTrigger>
            <DialogContent bg='white' color='#473647' p='20px 40px'>
                <CustomDialogHeader heading={`Room Type: ${roomType.name}`} />
                <DialogBody>
                    <RoomTypeForm roomType={roomType} />
                </DialogBody>
            </DialogContent>
        </DialogRoot>
      )
}

export default EditRecordDialog
