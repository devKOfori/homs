import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import { Box, Table, Flex, Button, IconButton } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Tooltip } from "../components/ui/tooltip";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import FloorList from "../components/FloorList";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

export interface HostelFloor {
  id: string;
  name: string;
}

const Floors = () => {
  const { floors, setFloors, updateFloors } = useRoomSetup();

  useEffect(() => {
    const { request, cancel } = roomService.getFloors();
    request.then((response) => {
      setFloors(response.data);
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
      <ActionPageHeader heading="Floor" table="floor" />
      <Box>
        <FloorList data={floors} heading="Floor" />
      </Box>
    </DashboardLayout>
  );
};

export default Floors;
