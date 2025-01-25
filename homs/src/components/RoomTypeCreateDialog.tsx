import React from 'react'
import { DialogBody, DialogRoot, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { FaPlus } from 'react-icons/fa'
import { Dialog, DialogContent } from '@chakra-ui/react';
import CustomDialogHeader from './CustomDialogHeader';
import RoomTypeForm from './RoomTypeForm';

interface Props {
    btnText: string;
    object: any;
}

const RoomTypeCreateDialog = ({ btnText, object=null }: Props) => {
  return (
    <DialogRoot size='lg' placement='center'>
        <DialogTrigger asChild>
            <Button px='10px' 
                bg='#473647'
                color='white'
                rounded='5px'
                p='20px'
                _hover={
                    {
                        transform: 'scale(1.05) translateY(-2px)',
                        transition: 'transform 0.3s ease-out',
                    }
                }
                >
                    {btnText} <FaPlus />
            </Button>
        </DialogTrigger>
        <DialogContent bg='white' color='#473647' p='20px 40px'>
            <CustomDialogHeader heading='Add Room Type' />
            <DialogBody>
                <RoomTypeForm roomType={object} />
            </DialogBody>
        </DialogContent>
    </DialogRoot>
  )
}

export default RoomTypeCreateDialog
