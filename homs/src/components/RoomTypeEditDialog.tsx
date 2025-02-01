import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import { Field } from "./ui/field";
import { HStack, Input, Text } from "@chakra-ui/react";
import AmenitiesLoad from "./AmenitiesLoad";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { RoomType } from "./RoomTypeList";
import roomService from "../services/room-service";

interface Props {
  roomType: RoomType;
}

const RoomTypeEditDialog = ({ roomType }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  // console.log(roomType);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    roomType.amenities || []
  );

  const { roomCategories, hotelViews, updateRoomTypes } = useRoomSetup();

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

  type RoomtypeInput = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roomType?.name || "",
      amenities: roomType?.amenities || [],
      bedTypes: roomType?.bed_types || [],
      view: roomType?.view || "",
      areaInMeters: roomType?.area_in_meters || 0,
      areaInFeet: roomType?.area_in_feet || 0,
      maxGuests: roomType?.max_guests || 0,
      rate: roomType?.rate || 0.0,
      roomCategory: roomType?.room_category || "",
    },
  });

  const onSubmit = (data: RoomtypeInput) => {
    let payload = {
      name: data.name,
      amenities: selectedAmenities,
      room_category: data.roomCategory,
      area_in_meters: data.areaInMeters,
      area_in_feet: data.areaInFeet,
      bed_types: [],
      rate: data.rate,
      view: data.view,
      max_guests: data.maxGuests,
    };

    const request = roomService.updateRoomType(roomType.id, payload);
    request.then((response) => {
      console.log(response.data);
      updateRoomTypes(response.data, "edit");
      setOpen(false);
    });
  };

  return (
    <>
      <DialogRoot
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
            <FaPen color="#473647" />
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" color="#473647" p="20px 40px">
          <CustomDialogHeader heading={`Update Category: ${roomType.id}`} />
          <DialogBody>
            <div>
              {error && <Text color="red">{error}</Text>}
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Field label="Room Type Name" mb="20px">
                  <Input
                    type="text"
                    px="10px"
                    placeholder="Room Type Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                </Field>
                <HStack gap="50px">
                  <Field label="Category" mb="20px">
                    <NativeSelectRoot>
                      <NativeSelectField
                        px="10px"
                        {...register("roomCategory")}
                      >
                        <option value="">Select Room Category</option>
                        {roomCategories.map((roomCategory) => (
                          <option
                            key={roomCategory.id}
                            value={roomCategory.name}
                          >
                            {roomCategory.name}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                    {errors.roomCategory && (
                      <Text color="red">{errors.roomCategory.message}</Text>
                    )}
                  </Field>
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
                    {errors.view && (
                      <Text color="red">{errors.view.message}</Text>
                    )}
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
                    {errors.rate && (
                      <Text color="red">{errors.rate.message}</Text>
                    )}
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
            </div>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default RoomTypeEditDialog;
