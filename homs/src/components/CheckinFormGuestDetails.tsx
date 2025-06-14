import { HStack, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";

const CheckinFormGuestDetails = () => {
  return (
    <>
      <HStack mb="10px" spaceX="10px">
        <Field label="Guest ID">
          <Input type="text" placeholder="Guest ID" px="5px" />
        </Field>
        <Field label="Guest Name">
          <Input type="text" placeholder="Guest Name" px="5px" />
        </Field>
      </HStack>
      <HStack mb="10px" spaceX="10px">
        <Field label="Gender">
          <Input type="text" placeholder="Gender" px="5px" />
        </Field>
        <Field label="Country">
          <Input type="text" placeholder="Country" px="5px" />
        </Field>
      </HStack>
      <HStack mb="10px" spaceX="10px">
        <Field label="Phone Number">
          <Input type="text" placeholder="Phone Number" px="5px" />
        </Field>
        <Field label="Email">
          <Input type="text" placeholder="Email" px="5px" />
        </Field>
      </HStack>
    </>
  );
};

export default CheckinFormGuestDetails;
