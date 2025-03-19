import { Box, Input } from "@chakra-ui/react";
import React from "react";
import { Field } from "./ui/field";

const BookingsPaymentInfoForm = () => {
  return (
    <Box>
      <Field label="Rate" mb="5px">
        <Input type="number" px="10px" required />
      </Field>
      <Field label="Payment Id" mb="5px">
        <Input type="text" px="10px" />
      </Field>
      <Field label="Amount Paid" mb="5px">
        <Input type="number" px="10px" required />
      </Field>
    </Box>
  );
};

export default BookingsPaymentInfoForm;
