import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import BedTypeList from "../components/BedTypeList";

const BedTypes = () => {
  const { bedTypes } = useRoomSetup();
  return (
    <DashboardLayout>
      <ActionPageHeader heading="Bed Type" table="bedtype" />
      <BedTypeList data={bedTypes} heading="Bed Types" />
    </DashboardLayout>
  );
};

export default BedTypes;
