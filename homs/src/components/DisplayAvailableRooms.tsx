import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import roomService from "../services/room-service";
import { Room } from "./RoomList";
import { useCheckInContext } from "../contexts/CheckInContext";
import { useFormContext } from "react-hook-form";

interface DisplayAvailableRoomsProps {
  roomType: string;
  roomCategory: string;
}

const DisplayAvailableRooms = ({
  roomType,
  roomCategory,
}: DisplayAvailableRoomsProps) => {
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string>("");

  const { register, setValue } = useFormContext();
  const { selectedRoom, setSelectedRoom, activeRate, setActiveRate } =
    useCheckInContext();

  const handleAvailableRoomClick = (roomNumber: string) => {
    if (selectedRoom === roomNumber) {
      setSelectedRoom(""); // Deselect if already selected
    } else {
      setSelectedRoom(roomNumber); // Select the room
      setValue("room_number", roomNumber); // Update the form context with the selected room
      register("room_number", { value: selectedRoom }); // Update the form context with the selected room
    }
  };

  useEffect(() => {
    const { request, cancel } = roomService.getRooms({
      room_type: roomType,
      room_category: roomCategory,
    });
    request
      .then((res) => {
        setError(""); // Clear any previous error
        setAvailableRooms(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.detail ?? "Couldn't load available rooms."
        );
      });
    return () => cancel();
  }, [roomType, roomCategory]);
  return (
    <>
      {error && (
        <Box color="red" fontSize="sm">
          {error}
        </Box>
      )}
      <Text>number of available rooms: {availableRooms.length}</Text>
      {availableRooms.length > 0 && (
        <Box>
          <Flex gap="0.5rem" flexWrap="wrap">
            {availableRooms.map((room) => (
              <Box
                {...(selectedRoom === room.room_number
                  ? { backgroundColor: "var(--hairline-background-faint)" }
                  : { backgroundColor: "white" })}
                onClick={() => {
                  handleAvailableRoomClick(room.room_number);
                }}
                key={room.id}
                border="1px solid #ccc"
                borderRadius="md"
                padding="0.5rem"
                margin="0.25rem"
                _hover={{
                  backgroundColor: "var(--hairline-background-faint)",
                  cursor: "pointer",
                }}
              >
                <Text fontWeight="bold">{room.room_number}</Text>
                {/* <Text>Category: {room.room_category}</Text>
                  <Text>Type: {room.room_type}</Text> */}
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </>
  );
};

export default DisplayAvailableRooms;
