import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import RoomCategoriesList, { Category } from "../components/RoomCategoriesList";
import ActionPageHeader from "../components/ActionPageHeader";
import RoomCategoriesForm from "../components/RoomCategoriesForm";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

const RoomCategories = () => {
  
  // const [roomCategories, setRoomCategories] = useState<Category[]>([]);

  const { roomCategories, updateRoomCategories } = useRoomSetup();
  // console.log(JSON.parse(localStorage.getItem("roomCategories")));
  console.log(roomCategories);
  // const { roomCategories, updateRoomCategories } = JSON.parse(localStorage.getItem("roomCategories"));

  const heading = "Room Category";

  return (
    <DashboardLayout>
      <ActionPageHeader heading={heading} table="roomcategory" />
      <RoomCategoriesList data={roomCategories} heading={heading} />
    </DashboardLayout>
  );
};

export default RoomCategories;
