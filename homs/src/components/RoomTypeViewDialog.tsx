import { FaEye } from "react-icons/fa"
import { Button } from "./ui/button"
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
import { Box, HStack, VStack, Text, Container, Heading, Flex } from '@chakra-ui/react'
import CustomDialogHeader from "./CustomDialogHeader"
import RoomTypeDetails from "./RoomTypeDetails"
import { RoomType } from "./RoomTypeList"

interface Props {
    roomtype: RoomType;
}

const RoomTypeViewDialog = ({ roomtype }: Props) => {
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
                <FaEye color='#473647'/>
            </Button>
        </DialogTrigger>
        <DialogContent bg='white' color='#473647' p='20px 40px'>
            <CustomDialogHeader heading={`Room Type: ${roomtype.name}`} />
            <DialogBody>
                <RoomTypeDetails roomtype={roomtype} />
            </DialogBody>
        </DialogContent>
    </DialogRoot>
  )
}

export default RoomTypeViewDialog
