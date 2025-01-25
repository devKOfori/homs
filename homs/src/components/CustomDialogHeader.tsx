import React from 'react'
import { DialogCloseTrigger, DialogHeader, DialogTitle } from './ui/dialog'
import { Heading } from '@chakra-ui/react'

interface Props {
    heading: string;
}

const CustomDialogHeader = ({ heading }: Props) => {
  return (
    <DialogHeader borderBottom='1px solid #DDDCDD' pb='15px'>
        <DialogTitle><Heading>{heading}</Heading></DialogTitle>
        <DialogCloseTrigger color='red.500'
        _hover={{
            bg: 'transparent',
            color: 'red.500',
            fontWeight: 'bold',
            transform: 'scale(1.05) translateY(-2px)',
            transition: 'transform 0.3s ease-in-out',
        }}  
        />
    </DialogHeader>
  )
}

export default CustomDialogHeader
