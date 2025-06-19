import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import { Box, Flex, IconButton, Table } from "@chakra-ui/react";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { Button } from "../components/ui/button";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "../components/ui/tooltip";
import HotelViewList from "../components/HotelViewList";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

export interface View {
  id: string;
  name: string;
}

const Views = () => {
  const { hotelViews, setHotelViews, updateViews } = useRoomSetup();

  useEffect(() => {
    const { request, cancel } = roomService.getHotelViews();
    request.then((response) => {
      setHotelViews(response.data);
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
      <ActionPageHeader heading="View" table="hotelView" />
      <Box>
        <HotelViewList data={hotelViews} heading="Hotel View" />
      </Box>
    </DashboardLayout>
  );
};

export default Views;
