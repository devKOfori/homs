import React from "react";
import {
  Box,
  Flex,
  NativeSelect,
  Input,
  HStack,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react";
import { Field } from "./ui/field";
import { RoomType, useRoomSetup } from "../contexts/RoomSetupProvider";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface InputProps {
  register: UseFormRegister<any>;
}

const BookingsRoomInfoForm = ({ register }: InputProps) => {
  const { roomTypes } = useRoomSetup();

  const schema = z.object({
    room_type: z.string(),
    check_in_date: z.string(),
    check_out_date: z.string(),
    number_of_older_guests: z.number(),
    number_of_younger_guests: z.number(),
    notes: z.string(),
  });

  const {} = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Box>
      <Field label="Room Type" mb="5px">
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("room_type")}>
            <option value="">Select Room type</option>
            {roomTypes.map((roomType: RoomType) => (
              <option key={roomType.id} value={roomType.name}>
                {roomType.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="Check-in Date" mb="5px">
        <Input type="date" px="10px" required {...register("check_in_date")} />
      </Field>
      <Field label="Check-out Date" mb="5px">
        <Input type="date" px="10px" {...register("check_out_date")} />
      </Field>
      <HStack>
        <Field label="No. of Adult Guests" mb="5px">
          <Input
            type="number"
            px="10px"
            required
            {...register("number_of_older_guests")}
          />
        </Field>
        <Field label="No. of Children Guests" mb="5px">
          <Input
            type="number"
            px="10px"
            {...register("number_of_younger_guests")}
          />
        </Field>
      </HStack>
      <Field label="Notes" mb="5px">
        <Input type="text" px="10px" {...register("notes")} />
      </Field>
    </Box>
  );
};

export default BookingsRoomInfoForm;
