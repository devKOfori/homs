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
  Country,
  Gender,
  IdentificationType,
  Title,
  useBooking,
} from "../contexts/BookingProvider";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { Field } from './ui/field'

type BookingGuestInfoInput = {
  title: "";
  first_name: "";
  last_name: "";
  email: "";
  phone_number: "";
  gender: "";
  country: "";
  address: "";
  identification_type: "";
  identification_number: "";
  emergency_contact_name: "";
  emergency_contact_number: "";
};

interface InputProps {
  register: UseFormRegister<any>;
}

const BookingsGuestInfoForm = ({ register }: InputProps) => {
  const { titles, genders, countries, identificationTypes } = useBooking();



  const guestInfoSchema = z.object({
    title: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
    gender: z.string(),
    country: z.string(),
    address: z.string(),
    identification_type: z.string(),
    identification_number: z.string(),
    emergency_contact_name: z.string(),
    emergency_contact_number: z.string(),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestInfoSchema),
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
          <Input type="email" {...register("email")} />
        </Field>
        <Field label="Phone" mb="5px">
          <Input {...register("phone_number")} />
        </Field>
      </HStack>
      <HStack>
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
        <Field label="Country" mb="5px">
          <NativeSelectRoot>
            <NativeSelectField px="10px" {...register("country")}>
              <option value="">Select Country</option>
              {countries.map((country: Country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>
      </HStack>

      <Field label="Address" mb="5px">
        <Input {...register("address")} />
      </Field>
      <HStack>
        <Field label="ID Type" mb="5px">
          <NativeSelect.Root>
            <NativeSelect.Field
              placeholder="Select ID Type"
              {...register("identification_type")}
            >
              {identificationTypes &&
                identificationTypes.map((idType: IdentificationType) => (
                  <option key={idType.id} value={idType.name}>
                    {idType.name}
                  </option>
                ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>
        <Field label="ID Number" mb="5px">
          <Input {...register("identification_number")} />
        </Field>
      </HStack>

      <HStack>
        <Field label="Emergency Contact Name" mb="5px">
          <Input {...register("emergency_contact_name")} />
        </Field>
        <Field label="Emergency Contact Number" mb="5px">
          <Input {...register("emergency_contact_number")} />
        </Field>
      </HStack>
    </>
  );
};

export default BookingsGuestInfoForm;
