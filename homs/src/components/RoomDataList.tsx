import React from "react";
import { DataListItem, DataListRoot } from "./ui/data-list";
import { Room } from "./RoomList";

interface Props {
  room: Room;
}
const RoomDataList = ({ room }: Props) => {
  return (
    <DataListRoot orientation="horizontal">
      <DataListItem label={"Room #:"} value={room.room_number} />
      <DataListItem label={"Room Type:"} value={room.room_type} />
      <DataListItem
        label={"Room Category:"}
        value={room.room_category ?? "N/A"}
      />
      <DataListItem label={"Floor:"} value={room.floor ?? "N/A"} />
      <DataListItem label={"Bed Type:"} value={room.bed_type ?? "N/A"} />
      {/* <DataListItem label={"Rate:"} value={room.rate} /> */}
      <DataListItem label={"Max Guests:"} value={room.max_occupancy} />
      <DataListItem
        label={"Maintenance Status:"}
        value={room.room_maintenance_status}
      />
      <DataListItem
        label={"Booking Status:"}
        value={room.room_booking_status}
      />
      <DataListItem label={"Amenities"} value={room.amenities?.join(", ")} />
    </DataListRoot>
  );
};

export default RoomDataList;
