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
        <DataList.ItemLabel>Room Category</DataList.ItemLabel>
        <DataList.ItemValue>
          {roomType.room_category || "N/A"}
        </DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Rate</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.rate || "N/A"}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Max Guests</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.max_guests}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Area in Meters</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.area_in_meters}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Area in Feet</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.area_in_feet}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>View</DataList.ItemLabel>
        <DataList.ItemValue>{roomType.view}</DataList.ItemValue>
      </DataList.Item>
      <DataList.Item>
        <DataList.ItemLabel>Bed Types</DataList.ItemLabel>
        <DataList.ItemValue>
          {roomType.bed_types ? roomType.bed_types?.join(", ") : "N/A"}
        </DataList.ItemValue>
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
