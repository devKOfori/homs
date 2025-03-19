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
import React from "react";
import {
  BookingContextProps,
  Gender,
  Title,
  useBooking,
} from "../contexts/BookingProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { Field } from './ui/field'

const BookingsGuestInfoForm = () => {
  const { titles, genders } = useBooking();

  const schema = z.object({
    title: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Field label="Title" mb="20px">
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("title")}>
            <option value="">Select Title</option>
            {titles.map((title: Title) => (
              <option key={title.id} value={title.name}>
                {title.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="First Name" mb="20px">
        <Input type="text" px="10px" required {...register("first_name")} />
      </Field>
      <Field label="Last Name" mb="20px">
        <Input type="text" px="10px" required {...register("last_name")} />
      </Field>
      <Field label="Gender" mb="20px">
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("gender")}>
            <option value="">Select Gender</option>
            {genders.map((gender: Gender) => (
              <option key={gender.id} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <HStack>
        <Field.Root orientation="horizontal">
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field placeholder="Select option">
              {titles.map((title: Title) => (
                <option key={title.id} value={title.name}>
                  {title.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </HStack>
      <Field.Root orientation="horizontal">
        <Field.Label>Email</Field.Label>
        <Input name="email" type="email" />
      </Field.Root>
      <Field.Root orientation="horizontal">
        <Field.Label>Phone</Field.Label>
        <Input name="phone" />
      </Field.Root>
      <Field.Root orientation="horizontal">
        <Field.Label>Address</Field.Label>
        <Input name="address" />
      </Field.Root>
      <HStack>
        <Field.Root orientation="horizontal">
          <Field.Label>ID Type</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field placeholder="Select option">
              {titles.map((title: Title) => (
                <option key={title.id} value={title.name}>
                  {title.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
        <Field.Root orientation="horizontal">
          <Field.Label>ID Number</Field.Label>
          <Input name="address" />
        </Field.Root>
      </HStack>

      <HStack>
        <Field.Root orientation="horizontal">
          <Field.Label>Emergency Contact Name</Field.Label>
          <Input name="emergency_contact_name" />
        </Field.Root>
        <Field.Root orientation="horizontal">
          <Field.Label>Emergency Contact Number</Field.Label>
          <Input name="emergency_contact_number" />
        </Field.Root>
      </HStack>
    </>
  );
};

export default BookingsGuestInfoForm;
