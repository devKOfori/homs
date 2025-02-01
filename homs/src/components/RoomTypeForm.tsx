import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { HStack, Input, Text, createListCollection } from "@chakra-ui/react";
import { NativeSelectRoot, NativeSelectField } from "./ui/native-select";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { RoomType } from "./RoomTypeList";
import AmenitiesLoad from "./AmenitiesLoad";
import { DialogActionTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import roomService from "../services/room-service";
import { CanceledError } from "axios";

interface Props {
  roomType: RoomType | null;
  setDialogOpened: (value: boolean) => void;
}

const RoomTypeForm = ({ roomType, setDialogOpened }: Props) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const schema = z.object({
    name: z.string().nonempty("Room Type Name is required"),
    amenities: z.array(z.string()),
    bedTypes: z.array(z.string()),
    view: z.string(),
    areaInMeters: z.coerce.number(),
    areaInFeet: z.coerce.number(),
    maxGuests: z.coerce.number(),
    rate: z.coerce.number(),
    roomCategory: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roomType?.name || "",
      amenities: roomType?.amenities || [],
      bedTypes: roomType?.bedTypes || [],
      view: roomType?.view || "",
      areaInMeters: roomType?.areaInMeters || 0,
      areaInFeet: roomType?.areaInFeet || 0,
      maxGuests: roomType?.maxGuests || 0,
      rate: roomType?.rate || 0.0,
      roomCategory: roomType?.roomCategory || "",
    },
  });

  const {
    bedTypes,
    amenities,
    roomCategories,
    floors,
    hotelViews,
    updateRoomTypes,
  } = useRoomSetup();

  const onSubmit = (data: RoomType) => {
    let action = null;
    let request = null;
    data.amenities = selectedAmenities;
    let payload = {
      name: data.name,
      amenities: data.amenities,
      room_category: data.roomCategory,
      area_in_meters: data.areaInMeters,
      area_in_feet: data.areaInFeet,
      bed_types: [],
      rate: data.rate,
      view: data.view,
      max_guests: data.maxGuests,
    };
    if (roomType) {
      action = "edit";
      request = roomService.updateRoomType(roomType.id, payload);
    } else {
      action = "create";
      request = roomService.createRoomType(payload);
    }
    request.then((response) => {
      updateRoomTypes(response.data, (action = "create"));
      setDialogOpened(false);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
  };

  const categoriesCollection = createListCollection({
    items: roomCategories,
  });


  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Room Type Name" mb="20px">
        <Input
          type="text"
          px="10px"
          placeholder="Room Type Name"
          {...register("name")}
        />
        {errors.name && <Text color="red">{errors.name.message}</Text>}
      </Field>
      <HStack gap="50px">
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
          {errors.roomCategory && (
            <Text color="red">{errors.roomCategory.message}</Text>
          )}
        </Field>
        {errors.roomCategory && (
          <Text color="red">{errors.roomCategory.message}</Text>
        )}
        <Field label="View" mb="20px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("view")}>
              <option value="">Select View</option>
              {hotelViews.map((view) => (
                <option key={view.id} value={view.name}>
                  {view.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
          {errors.view && <Text color="red">{errors.view.message}</Text>}
        </Field>
      </HStack>
      <HStack gap="50px">
        <Field label="Area (m)" mb="20px">
          <Input
            type="number"
            px="10px"
            placeholder="Area in Meters"
            {...register("areaInMeters")}
          />
        </Field>
        <Field label="Area (ft)" mb="20px">
          <Input
            type="number"
            px="10px"
            placeholder="Area in Feet"
            {...register("areaInFeet")}
          />
        </Field>
      </HStack>
      <HStack gap="50px">
        <Field label="Rate" mb="20px">
          <Input
            type="number"
            px="10px"
            placeholder="Rate"
            {...register("rate")}
          />
        </Field>
        <Field label="Max Guests" mb="20px">
          <Input
            type="number"
            px="10px"
            placeholder="Max Guests"
            {...register("maxGuests")}
          />
        </Field>
      </HStack>
      <Field label="Amenities" mb="20px">
        <AmenitiesLoad
          data={amenities}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
        />
      </Field>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="outline" px="25px" bg="red.500">
            Cancel
          </Button>
        </DialogActionTrigger>
        <Button type="submit" bg="#473647" color="white" px="25px">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RoomTypeForm;
