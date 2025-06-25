import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Booking } from "../contexts/BookingProvider";
import { useForm, FormProvider } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import CheckinFormGuestDetails from "./CheckinFormGuestDetails";
import CheckinFormReservationDetails from "./CheckinFormReservationDetails";
import CheckinFormPaymentDetails from "./CheckinFormPaymentDetails";
import { Button } from "./ui/button";
import dayjs from "dayjs";

interface CheckinFormProps {
  booking?: Booking;
}

const CheckinForm = ({ booking }: CheckinFormProps) => {
  const [formSection, setFormSection] = useState(1);

  const checkInGuestInfoSchema = z.object({
    booking_id: z.string().nonempty("Booking ID is required"),
    guest_name: z.string().nonempty("Guest name is required"),
    gender: z.string().nonempty("Gender is required"),
    country: z.string().nonempty("Country is required"),
    phone_number: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    identification_type: z.string().optional(),
    identification_number: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_number: z.string().optional(),
  });

  const checkInReservationDetailsSchema = z.object({
    room_type: z.string().nonempty("Room type is required"),
    room_category: z.string().optional(),
    room_number: z.string().nonempty("Room number is required"),
    check_in_date: z.string().nonempty("Check-in date is required"),
    check_out_date: z.string().optional(),
    number_of_guests: z.coerce
      .number()
      .min(1, "At least one guest is required"),
    number_of_children_guests: z.coerce.number().optional(),
    cost_per_night: z.coerce.number().optional(),
    total_cost: z.coerce.number().optional(),
    note: z.string().optional(),
  });

  const checkInPaymentDetailsSchema = z.object({
    sponsor: z.string().nonempty("Sponsor is required"),
    employee_id: z.string().optional(),
    payment_type: z.string().nonempty("Payment type is required"), // e.g., Cash, Credit, Company Invoice
    deposit_paid: z.coerce.number().optional(),
    receipt_number: z.string().optional(),
  });

  const checkInSchema = checkInGuestInfoSchema
    .and(checkInReservationDetailsSchema)
    .and(checkInPaymentDetailsSchema);

  const methods = useForm({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      booking_id: booking?.id || "walk-in",
      check_in_date:
        booking?.check_in_date || dayjs().toISOString().split("T")[0],
      number_of_guests: booking?.number_of_guests || 1,
      number_of_children_guests: booking?.number_of_children_guests || 0,
    },
  });

  const { getValues, trigger } = methods;

  const handleNext = async () => {
    const values = getValues();
    let isValid = false;
    switch (formSection) {
      case 1:
        isValid = checkInGuestInfoSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(checkInGuestInfoSchema.shape));
        }
        break;
      case 2:
        isValid = checkInReservationDetailsSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(checkInReservationDetailsSchema.shape));
        }
        break;
      case 3:
        isValid = checkInPaymentDetailsSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(checkInPaymentDetailsSchema.shape));
        }
        break;
    }
    if (isValid) {
      setFormSection((prev) => (prev % 3) + 1);
    }
  };
  const handleBack = () => {
    if (formSection > 1) {
      setFormSection((prev) => prev - 1);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <form method="post">
          {formSection === 1 ? (
            <CheckinFormGuestDetails />
          ) : formSection === 2 ? (
            <CheckinFormReservationDetails />
          ) : (
            <CheckinFormPaymentDetails />
          )}
          <Box>
            {formSection > 1 && <Button onClick={handleBack}>Back</Button>}
            {formSection < 3 && <Button onClick={handleNext}>Next</Button>}
            {formSection === 3 && <Button type="submit">Save</Button>}
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default CheckinForm;
