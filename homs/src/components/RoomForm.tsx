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
        <HStack gap="20px">
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
          <Field label="Room Type" mb="20px">
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
        </HStack>
        <HStack gap="20px">
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
        </HStack>
        <HStack gap="20px">
          <Field label="Rate" mb="20px">
            <Input type="number" required {...register("rate")} px="10px" />
          </Field>
          <Field label="Max. Guests" mb="20px">
            <Input
              type="number"
              required
              {...register("maxGuests")}
              px="10px"
            />
          </Field>
        </HStack>
        <Field label="Maintenance" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("maintenanceStatus")}>
              {maintenanceOptions.map((option) => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
        <Field label="Amenities" mb="20px">
          <AmenitiesLoad
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </Field>
        <Button bg="var(--header-bg)" p="10px 20px" type="submit" color="white">
          Save
        </Button>
      </form>
    </>
  );
};

export default RoomForm;
