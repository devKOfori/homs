import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import { Box, Flex, IconButton, Table } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { Button } from "../components/ui/button";
import { FaEye } from "react-icons/fa";

interface Room {
  id: string;
  room_number: string;
  room_category: string;
  room_type: string;
  floor: string;
  bed_type: string;
  rate: number;
  max_guests: number;
  is_occupied: boolean;
  room_maintenance_status: string;
  room_booking_status: string;
  amenities: string[];
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const { request, cancel } = roomService.getRooms();
    request.then((response) => {
      setRooms(response.data);
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  return (
    <DashboardLayout>
      <ActionPageHeader heading="Rooms" />
      <Box>
        <Table.Root mt="50px" mb="20px" size="sm" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px" py="5px"
              >
                Room Number
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px" py="5px"
              >
                Room Type
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px" py="5px"
              >
                Floor
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px" py="5px"
              >
                Maintenance
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px" py="5px"
              >
                Booking{" "}
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px"
                py="5px"
              ></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rooms.map((room) => (
              <Table.Row key={room.id} bg="white">
                <Table.Cell px="30px" py="5px">
                  {room.room_number}
                </Table.Cell>
                <Table.Cell px="30px" py="5px">
                  {room.room_type}
                </Table.Cell>
                <Table.Cell px="30px" py="5px">
                  {room.floor}
                </Table.Cell>
                <Table.Cell px="30px" py="5px">
                  {room.room_maintenance_status}
                </Table.Cell>
                <Table.Cell px="30px" py="5px">
                  {room.room_booking_status}
                </Table.Cell>
                <Table.Cell px="30px" py="5px">
                  <Flex justifyContent={"center"} w={"100%"}>
                    <Tooltip content={`View Room`}>
                      <Button
                        mx="1px"
                        size={"xs"}
                        onClick={() => console.log("icon clicked")}
                        _hover={{
                          transform: "scale(1.1)",
                          border: "1px solid var(--darkened-bg-2)",
                          bg: "var(--darkened-bg)",
                        }}
                      >
                        <FaEye />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit Category">
                      <IconButton
                        size={"xs"}
                        _hover={{
                          transform: "scale(1.05)",
                          transition: "transform 0.3s ease-out",
                          border: "1px solid var(--darkened-bg-2)",
                          bg: "var(--darkened-bg)",
                        }}
                      >
                        <MdEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Category">
                      <IconButton
                        size={"xs"}
                        _hover={{
                          transform: "scale(1.1)",
                          border: "1px solid var(--darkened-bg-2)",
                          bg: "var(--darkened-bg)",
                        }}
                      >
                        <BiTrash />
                      </IconButton>
                    </Tooltip>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </DashboardLayout>
  );
};

export default Rooms;
