import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import RoomRateList from "../components/RoomRateList";

const RoomRates = () => {
  return (
    <DashboardLayout>
      <ActionPageHeader heading="Room Rate" table="roomrate" />
      <RoomRateList />
    </DashboardLayout>
  );
};

export default RoomRates;
