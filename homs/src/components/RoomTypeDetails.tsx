import { DataList } from "@chakra-ui/react";
import React from "react";
import { RoomType } from "./RoomTypeList";

interface Props {
  roomType: RoomType;
}

const RoomTypeDetails = ({ roomType }: Props) => {
  return (
    <DataList.Root orientation="horizontal">
      <DataList.Item>
        <DataList.ItemLabel>Room Type</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.name}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Max Occupancy</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.max_occupancy}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Base Price</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.base_price || "N/A"}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Amenities</DataList.ItemLabel>
        <DataList.ItemValue>
          {roomType.amenities ? roomType.amenities?.join(", ") : "N/A"}
        </DataList.ItemValue>
      </DataList.Item>
    </DataList.Root>
  );
};

export default RoomTypeDetails;
