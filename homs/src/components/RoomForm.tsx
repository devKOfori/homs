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

interface Props {
  room: Room | null;
  setDialogOpened: (value: boolean) => void;
}

const RoomForm = ({ room, setDialogOpened }: Props) => {
  console.log(room);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    room?.amenities || []
  );
  const [error, setError] = useState<string>("");
  const { roomCategories, roomTypes, floors, bedTypes, hotelViews, updateRooms } =
    useRoomSetup<RoomSetupContextProps>();

  const schema = z.object({
    roomNumber: z.string().nonempty({ message: "Room Number is required" }),
    roomCategory: z.string(),
    roomType: z.string(),
    floor: z.string(),
    bedType: z.string(),
    roomView: z.string(),

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
      roomType: room ? room.room_type : "",
      roomCategory: room ? room.room_category : "",
      floor: room ? room.floor : "",
      roomView: room ? room.room_view : "",
      bedType: room ? room.bed_type : "",
    },
  });

  const onSubmit = (data: RoomFormValues) => {
    console.log("Submitting room form", data);
    let request = null;
    let action = "";
    const payload = {
      amenities: selectedAmenities,
      room_number: data.roomNumber,
      room_category: data.roomCategory,
      room_type: data.roomType,
      floor: data.floor,
      bed_type: data.bedType,
    };
    if (room) {
      request = roomService.updateRoom(room.id ?? "", payload);
      action = "edit";
    } else {
      request = roomService.createRoom(payload);
      action = "create";
    }
    request.then((response) => {
      updateRooms(response.data, action);
      setDialogOpened(false);
    });
    request.catch((error) => {
      setError(error.message);
    });
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Room Number" mb="20px" required>
          <Input type="text" {...register("roomNumber")} px="10px" />
        </Field>
        <Field label="Room Type" mb="20px" required>
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("roomType")}>
              <option value="">Select Room Category</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.name}>
                  {roomType.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Category" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("roomCategory")}>
              <option value="">Select Room Category</option>
              {roomCategories.map((roomCategory) => (
                <option key={roomCategory.id} value={roomCategory.name}>
                  {roomCategory.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Floor" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("floor")}>
              <option value="">Select Floor</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.name}>
                  {floor.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="View" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("roomView")}>
              <option value="">Select Floor</option>
              {hotelViews.map((view) => (
                <option key={view.id} value={view.name}>
                  {view.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Bed Type" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("bedType")}>
              <option value="">Select Bed Type</option>
              {bedTypes.map((bedType) => (
                <option key={bedType.id} value={bedType.name}>
                  {bedType.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Button bg="var(--header-bg)" p="10px 20px" type="submit" color="white">
          Save
        </Button>
      </form>
    </>
  );
};

export default RoomForm;
