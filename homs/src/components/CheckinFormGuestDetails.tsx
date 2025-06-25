import { HStack, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useBooking } from "../contexts/BookingProvider";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormContext } from "react-hook-form";

const CheckinFormGuestDetails = () => {
  const { genders, countries, identificationTypes } = useBooking();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Field label="Booking ID" mb={"10px"}>
        <Input
          type="text"
          placeholder="Booking ID"
          px="10px"
          {...register("booking_id")}
        />
        {errors.booking_id && (
          <span style={{ color: "red" }}>{errors.booking_id.message}</span>
        )}
      </Field>
      <Field label="Guest Name" mb={"10px"}>
        <Input
          type="text"
          placeholder="Guest Name"
          px="10px"
          {...register("guest_name")}
        />
        {errors.guest_name && (
          <span style={{ color: "red" }}>{errors.guest_name.message}</span>
        )}
      </Field>
      <Field label="Gender" mb={"10px"}>
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("gender")}>
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        {errors.gender && (
          <span style={{ color: "red" }}>{errors.gender.message}</span>
        )}
      </Field>
      <Field label="Country" mb={"10px"}>
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("country")}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        {errors.country && (
          <span style={{ color: "red" }}>{errors.country.message}</span>
        )}
      </Field>
      <Field label="Phone Number" mb={"10px"}>
        <Input
          type="text"
          placeholder="Phone Number"
          px="10px"
          {...register("phone_number")}
        />
        {errors.phone_number && (
          <span style={{ color: "red" }}>{errors.phone_number.message}</span>
        )}
      </Field>
      <Field label="Email" mb={"10px"}>
        <Input
          type="text"
          placeholder="Email"
          px="10px"
          {...register("email")}
        />
        {errors.email && (
          <span style={{ color: "red" }}>{errors.email.message}</span>
        )}
      </Field>
      <Field label="ID Type" mb={"10px"}>
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("identification_type")}>
            <option value="">Select ID Type</option>
            {identificationTypes?.map((idType) => (
              <option key={idType.id} value={idType.name}>
                {idType.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        {errors.identification_type && (
          <span style={{ color: "red" }}>
            {errors.identification_type.message}
          </span>
        )}
      </Field>
      <Field label="ID Number" mb={"10px"}>
        <Input
          type="text"
          placeholder="ID Number"
          px="10px"
          {...register("identification_number")}
        />
        {errors.identification_number && (
          <span style={{ color: "red" }}>
            {errors.identification_number.message}
          </span>
        )}
      </Field>
      <Field label="Emergency Contact Name" mb={"10px"}>
        <Input
          type="text"
          placeholder="Emergency Contact Name"
          px="10px"
          {...register("emergency_contact_name")}
        />
        {errors.emergency_contact_name && (
          <span style={{ color: "red" }}>
            {errors.emergency_contact_name.message}
          </span>
        )}
      </Field>
      <Field label="Emergency Contact Phone" mb={"10px"}>
        <Input
          type="text"
          placeholder="Emergency Contact Phone"
          px="10px"
          {...register("emergency_contact_phone")}
        />
        {errors.emergency_contact_phone && (
          <span style={{ color: "red" }}>
            {errors.emergency_contact_phone.message}
          </span>
        )}
      </Field>
    </>
  );
};

export default CheckinFormGuestDetails;
