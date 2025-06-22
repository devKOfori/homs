import { useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import CustomDialogHeader from "./CustomDialogHeader";
import { FaTrash } from "react-icons/fa";
import roomService from "../services/room-service";
import {
  RoomSetupContextProps,
  useRoomSetup,
} from "../contexts/RoomSetupProvider";

import { Amenity } from "./AmenityList";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  amenity: Amenity;
}

const AmenityDeleteDialog = ({ amenity }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const { amenities, setAmenities } = useRoomSetup<RoomSetupContextProps>();

  const handleDelete = () => {
    const request = roomService.deleteAmenity(amenity.id);
    request.then((res) => {
      const updatedAmenities = amenities.filter(
        (a) => a.id !== amenity.id
      );
      setAmenities(updatedAmenities);
      setOpen(false);
      localStorage.setItem("amenities", JSON.stringify(updatedAmenities));
    });
    request.catch((err) => {
      setError(err.response.data.detail);
    });
  };

  return (
    <>
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
                {amenity.name}
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
    </>
  );
};

export default AmenityDeleteDialog;
