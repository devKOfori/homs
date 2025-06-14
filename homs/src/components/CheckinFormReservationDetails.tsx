import { HStack, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";

const CheckinFormReservationDetails = () => {
  return (
    <>
      <Field label="Room Type" mb="10px">
        <Input type="text" placeholder="Room Type" px="5px" />
      </Field>
      <Field label="Room Number" mb="10px">
        <Input type="text" placeholder="Room Number" px="5px" />
      </Field>
      <HStack mb="10px" spaceX="10px">
        <Field label="Number of Older Guests">
          <Input type="text" placeholder="Number of Older Guests" px="5px" />
        </Field>
        <Field label="Number of Younger Guests">
          <Input type="text" placeholder="Number of Younger Guests" px="5px" />
        </Field>
      </HStack>
      <HStack mb="10px" spaceX="10px">
        <Field label="Check In Date">
          <Input type="date" placeholder="Check In Date" px="5px" disabled />
        </Field>
        <Field label="Check Out Date">
          <Input type="date" placeholder="Check Out Date" px="5px" />
        </Field>
      </HStack>
    </>
  );
};

export default CheckinFormReservationDetails;
