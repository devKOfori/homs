import { Box, Input } from "@chakra-ui/react";
import React from "react";
import { Field } from "./ui/field";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface InputProps {
  register: UseFormRegister<any>;
}

const BookingsPaymentInfoForm = ({ register }: InputProps) => {
  const schema = z.object({
    rate: z.number(),
    payment_id: z.string(),
    amount_paid: z.number(),
  });

  const {} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount_paid: 0,
      payment_id: "",
      rate: 0,
    },
  });
  return (
    <Box>
      <Field label="Rate" mb="5px">
        <Input type="number" px="10px" required {...register("rate")} />
      </Field>
      <Field label="Payment Id" mb="5px">
        <Input type="text" px="10px" {...register("payment_id")} />
      </Field>
      <Field label="Amount Paid" mb="5px">
        <Input type="number" px="10px" required {...register("amount_paid")} />
      </Field>
    </Box>
  );
};

export default BookingsPaymentInfoForm;
