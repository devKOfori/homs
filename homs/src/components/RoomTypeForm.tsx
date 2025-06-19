import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { Box, Input, Text } from "@chakra-ui/react";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { RoomType } from "./RoomTypeList";
import { DialogActionTrigger, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import roomService from "../services/room-service";
import { CanceledError } from "axios";

interface Props {
  roomType: RoomType | null;
  setDialogOpened: (value: boolean) => void;
}

const RoomTypeForm = ({ roomType, setDialogOpened }: Props) => {
  const schema = z.object({
    name: z.string().nonempty("Room Type Name is required"),
    maxOccupancy: z.coerce.number(),
    basePrice: z.coerce.number(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: roomType?.name || "",
      maxOccupancy: roomType?.max_occupancy || 1,
      basePrice: roomType?.base_price || 0.0,
      // amenities: roomType?.amenities || [],
    },
  });

  const { updateRoomTypes } = useRoomSetup();

  const onSubmit = (data: RoomType) => {
    // console.log(data);
    let action = null;
    let request = null;
    // data.amenities = selectedAmenities;
    let payload: RoomType = {
      name: data.name,
      // amenities: data.amenities,
      base_price: data.base_price,
      max_occupancy: data.max_occupancy,
    };
    // console.log("Submitting room type form", payload);
    if (roomType) {
      action = "edit";
      console.log("Updating room type", roomType.id);
      console.log(data);
      request = roomService.updateRoomType(roomType.id ?? "", data);
    } else {
      action = "create";
      request = roomService.createRoomType(data);
    }
    console.log(action);
    request.then((response) => {
      updateRoomTypes(response.data, (action = action));
      setDialogOpened(false);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Field label="Name" mb="20px">
          <Input
            type="text"
            px="10px"
            placeholder="Room Type Name"
            {...register("name")}
          />
          {errors.name && <Text color="red">{errors.name.message}</Text>}
        </Field>
      </Box>
      <Box>
        <Box>
          <Field label="Max Occupancy" mb="20px">
            <Input
              type="number"
              min="1"
              px="10px"
              placeholder="Max Occupancy"
              {...register("maxOccupancy", { valueAsNumber: true })}
            />
            {errors.maxGuests && (
              <Text color="red">{errors.maxGuests.message}</Text>
            )}
          </Field>
        </Box>
        <Box>
          <Field label="Base Price" mb="20px">
            <Input
              type="number"
              step="0.01"
              min="0"
              px="10px"
              placeholder="Rate"
              {...register("basePrice", { valueAsNumber: true })}
            />
            {errors.rate && <Text color="red">{errors.rate.message}</Text>}
          </Field>
        </Box>
      </Box>
      {/* <Field label="Amenities" mb="20px">
        <AmenitiesLoad
          data={amenities}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
        />
      </Field> */}
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
