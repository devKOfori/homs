import { useState } from "react";
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
import { RiDeleteBinLine } from "react-icons/ri";

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
      const updatedRoomCategories = roomCategories.filter(
        (category) => category.id !== roomCategory.id
      );
      setRoomCategories(updatedRoomCategories);
      setOpen(false);
      localStorage.setItem(
        "roomCategories",
        JSON.stringify(updatedRoomCategories)
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
            bg: "var(--hairline-background-faint)",
          }}
        >
          <RiDeleteBinLine color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent bg="white" color="#473647">
        <CustomDialogHeader heading="Delete Record" />
        <DialogBody p={{ base: "0.5rem", md: "1.3rem 1.5rem" }}>
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
