import React, { useState } from 'react'
import { RoomSetupContextProps, useRoomSetup } from '../contexts/RoomSetupProvider';
import roomService from '../services/room-service';
import { RoomType } from './RoomTypeList';
import { DialogBody, DialogContent, DialogRoot, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { FaTrash } from 'react-icons/fa';
import CustomDialogHeader from './CustomDialogHeader';
import { Flex, HStack, Text } from "@chakra-ui/react";

interface Props {
    roomType: RoomType;
}

const RoomTypeDeleteDialog = ({ roomType }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const { roomTypes, setRoomTypes } =
    useRoomSetup<RoomSetupContextProps>();
    
  const handleDelete = () => {
    const request = roomService.deleteRoomType(roomType.id);
    request.then((res) => {
      const updatedRoomTypes = roomTypes.filter(
        (rmType) => rmType.id !== roomType.id
      );
      setRoomTypes(updatedRoomTypes);
      setOpen(false);
      localStorage.setItem(
        "roomTypes",
        JSON.stringify(updatedRoomTypes)
      );
    });
    request.catch((err) => {
      setError(err.response.data.detail);
    });
  };

  return (
    <DialogRoot
      size="lg"
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger>
        <Button
          size="xs"
          _hover={{
            transform: "scale(1.2) translateY(-2px)",
            transition: "transform 0.3s ease-out",
            bg: "#DDDCDD",
            border: "1px solid #473647",
          }}
        >
          <FaTrash color="#473647" />
        </Button>
      </DialogTrigger>
      <DialogContent bg="white" color="#473647" p="20px 40px">
        <CustomDialogHeader heading="Delete Record" />
        <DialogBody>
          {error && <Text color="red">{error}</Text>}
          <HStack>
            <Text>Are you sure you want to delete this record</Text>
            <Text color="#417690" fontWeight="bold">
              {roomType.name}
            </Text>
            ?{" "}
          </HStack>
          <Flex gap="5px" my="20px">
            <Button px="10px" colorPalette="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button px="10px" bg={"gray"} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}

export default RoomTypeDeleteDialog
