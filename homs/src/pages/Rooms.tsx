import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import { Box, Flex, IconButton, Table } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { Button } from "../components/ui/button";
import { FaEye } from "react-icons/fa";
import RoomList from "../components/RoomList";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

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
  const { rooms } = useRoomSetup();

  return (
    <DashboardLayout>
      <ActionPageHeader heading="Rooms" table="room" />
      <RoomList data={rooms} heading="Room" />
    </DashboardLayout>
  );
};

export default Rooms;
