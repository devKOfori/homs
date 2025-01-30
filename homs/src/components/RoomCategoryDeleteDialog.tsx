import React, { useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Category } from "./RoomCategoriesList";
import roomService from "../services/room-service";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

interface Props {
  roomCategory: Category;
}

const RoomCategoryDeleteDialog = ({ roomCategory }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const { roomCategories, setRoomCategories } =
    useRoomSetup<RoomSetupContextProps>();
  const handleDelete = () => {
    const request = roomService.deleteRoomCategory(roomCategory.id);
    request.then((res) => {
      console.log("Deleted", res.data);
      setRoomCategories(
        roomCategories.filter((category) => category.id !== roomCategory.id)
      );
      setOpen(false);
    });
    request.catch((err) => {
      console.log("Error", err);
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
              {roomCategory.name}
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
};

export default RoomCategoryDeleteDialog;
