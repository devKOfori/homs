import { useState } from "react";
import { DataListItem, DataListRoot } from "./ui/data-list";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import CustomDialogHeader from "./CustomDialogHeader";
import { Room } from "./RoomList";
import RecordViewDialog from "./RecordViewDialog";
import RoomDataList from "./RoomDataList";

interface Props {
  room: Room;
}

const RoomViewDialog = ({ room }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>
          <Button
            size="xs"
            _hover={{
              transform: "scale(1.2) translateY(-2px)",
              transition: "transform 0.3s ease-out",
              bg: "#DDDCDD",
              border: "1px solid #473647",
            }}
          >
            <FaEye color="#473647" />
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" color="#473647" p="20px 40px">
          <CustomDialogHeader heading={`${room.room_number}`} />
          <DialogBody>
            <DataListRoot orientation="horizontal">
              <DataListItem label={"Room #:"} value={room.room_number} />
              <DataListItem
                label={"Room Category:"}
                value={room.room_category}
              />
              <DataListItem label={"Room Type:"} value={room.room_type} />
              <DataListItem label={"Floor:"} value={room.floor} />
              <DataListItem label={"Bed Type:"} value={room.bed_type} />
              <DataListItem label={"Rate:"} value={room.rate} />
              <DataListItem label={"Max Guests:"} value={room.max_guests} />
              <DataListItem
                label={"Maintenance Status:"}
                value={room.room_maintenance_status}
              />
              <DataListItem
                label={"Booking Status:"}
                value={room.room_booking_status}
              />
              <DataListItem
                label={"Amenities"}
                value={room.amenities?.join(", ")}
              />
            </DataListRoot>
          </DialogBody>
        </DialogContent>
      </DialogRoot> */}
      <RecordViewDialog record={room}>
        {/* <DataListRoot orientation="horizontal">
          <DataListItem label={"Room #:"} value={room.room_number} />
          <DataListItem label={"Room Category:"} value={room.room_category} />
          <DataListItem label={"Room Type:"} value={room.room_type} />
          <DataListItem label={"Floor:"} value={room.floor} />
          <DataListItem label={"Bed Type:"} value={room.bed_type} />
          <DataListItem label={"Rate:"} value={room.rate} />
          <DataListItem label={"Max Guests:"} value={room.max_guests} />
          <DataListItem
            label={"Maintenance Status:"}
            value={room.room_maintenance_status}
          />
          <DataListItem
            label={"Booking Status:"}
            value={room.room_booking_status}
          />
          <DataListItem
            label={"Amenities"}
            value={room.amenities?.join(", ")}
          />
        </DataListRoot> */}
        <RoomDataList room={room} />
      </RecordViewDialog>
    </>
  );
};

export default RoomViewDialog;
