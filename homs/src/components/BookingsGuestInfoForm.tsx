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
      <Field label="Title" mb="5px">
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
      <HStack>
        <Field label="First Name" mb="5px">
          <Input type="text" px="10px" required {...register("first_name")} />
        </Field>
        <Field label="Last Name" mb="5px">
          <Input type="text" px="10px" required {...register("last_name")} />
        </Field>
      </HStack>
      <HStack>
        <Field label="Email" mb="5px">
          <Input name="email" type="email" />
        </Field>
        <Field label="Phone" mb="5px">
          <Input name="phone" />
        </Field>
      </HStack>

      <Field label="Gender" mb="5px">
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
      {/* <HStack>
        <Field label="Gender" mb="5px">
          <NativeSelect.Root>
            <NativeSelect.Field placeholder="Select option">
              {titles.map((title: Title) => (
                <option key={title.id} value={title.name}>
                  {title.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>
      </HStack> */}

      <Field label="Address" mb="5px">
        <Input name="address" />
      </Field>
      <HStack>
        <Field label="ID Type" mb="5px">
          <NativeSelect.Root>
            <NativeSelect.Field placeholder="Select option">
              {titles.map((title: Title) => (
                <option key={title.id} value={title.name}>
                  {title.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>
        <Field label="ID Number" mb="5px">
          <Input name="address" />
        </Field>
      </HStack>

      <HStack>
        <Field label="Emergency Contact Name" mb="5px">
          <Input name="emergency_contact_name" />
        </Field>
        <Field label="Emergency Contact Number" mb="5px">
          <Input name="emergency_contact_number" />
        </Field>
      </HStack>
    </>
  );
};

export default BookingsGuestInfoForm;
