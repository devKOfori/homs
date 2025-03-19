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

const BookingsRoomInfoForm = () => {
  const { roomTypes } = useRoomSetup();
  return (
    <Box>
      <Field label="Room Type" mb="5px">
        <NativeSelectRoot>
          <NativeSelectField px="10px">
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
        <Input type="date" px="10px" required />
      </Field>
      <Field label="Check-out Date" mb="5px">
        <Input type="date" px="10px" />
      </Field>
      <HStack>
        <Field label="No. of Adult Guests" mb="5px">
          <Input type="number" px="10px" required />
        </Field>
        <Field label="No. of Children Guests" mb="5px">
          <Input type="number" px="10px" />
        </Field>
      </HStack>
      <Field label="Notes" mb="5px">
        <Input type="text" px="10px" />
      </Field>
    </Box>
  );
};

export default BookingsRoomInfoForm;
