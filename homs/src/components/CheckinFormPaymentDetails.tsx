import { HStack, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";

const CheckinFormPaymentDetails = () => {
  return (
    <>
      <Field label="Sponsor" mb="10px">
        <Input type="text" placeholder="Sponsor" px="5px" />
      </Field>
      <HStack mb="10px" spaceX="10px">
        <Field label="Department">
          <Input type="text" placeholder="Department" px="5px" />
        </Field>
        <Field label="Employee ID">
          <Input type="text" placeholder="Employee ID" px="5px" />
        </Field>
      </HStack>
    </>
  );
};

export default CheckinFormPaymentDetails;
