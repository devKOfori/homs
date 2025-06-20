import React, { useState } from "react";
import { Room } from "./RoomList";
import { HStack, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "./ui/field";
import { NativeSelectRoot, NativeSelectField } from "./ui/native-select";
import {
  RoomSetupContextProps,
  useRoomSetup,
} from "../contexts/RoomSetupProvider";
import { maintenanceOptions } from "../RoomMaintenanceOptions";
import AmenitiesLoad from "./AmenitiesLoad";
import { Button } from "./ui/button";
import roomService from "../services/room-service";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import RoomForm from "./RoomForm";
import RecordEditDialog from "./RecordEditDialog";
interface Props {
  room: Room;
}

const RoomEditDialog = ({ room }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    room.amenities || []
  );

  const { roomCategories, roomTypes, floors, bedTypes, updateRooms } =
    useRoomSetup<RoomSetupContextProps>();

  const schema = z.object({
    roomNumber: z.string().nonempty({ message: "Room Number is required" }),
    roomCategory: z.string(),
    roomType: z.string(),
    floor: z.string(),
    bedType: z.string(),
    rate: z.coerce.number(),
    maxGuests: z.coerce.number(),
    maintenanceStatus: z.string(),
  });

  type RoomFormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      roomNumber: room ? room.room_number : "",
      roomCategory: room ? room.room_category : "",
      roomType: room ? room.room_type : "",
      floor: room ? room.floor : "",
      bedType: room ? room.bed_type : "",
      rate: room ? room.rate : 0.0,
      maxGuests: room ? room.max_guests : 1,
      maintenanceStatus: room ? room.room_maintenance_status : "default",
    },
  });

  const onSubmit = (data: RoomFormValues) => {
    let request = null;
    let action = "";
    const payload = {
      amenities: selectedAmenities,
      room_number: data.roomNumber,
      room_category: data.roomCategory,
      room_type: data.roomType,
      floor: data.floor,
      bed_type: data.bedType,
      rate: data.rate,
      max_guests: data.maxGuests,
      room_maintenance_status: data.maintenanceStatus,
    };
    if (room) {
      request = roomService.updateRoom(room.id, payload);
      action = "edit";
    } else {
      request = roomService.createRoom(payload);
      action = "create";
    }
    request.then((response) => {
      updateRooms(response.data, action);
      setOpen(false);
    });
    request.catch((error) => {
      setError(error.message);
    });
  };

  return (
    <>
      <RecordEditDialog>
        <RoomForm room={room} setDialogOpened={setOpen} />
      </RecordEditDialog>
    </>
  );
};

export default RoomEditDialog;
