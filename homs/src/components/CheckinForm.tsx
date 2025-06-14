import { Heading, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Booking } from "../contexts/BookingProvider";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import CheckinFormGuestDetails from "./CheckinFormGuestDetails";
import CheckinFormReservationDetails from "./CheckinFormReservationDetails";
import CheckinFormPaymentDetails from "./CheckinFormPaymentDetails";
import { Button } from "./ui/button";

interface CheckinFormProps {
  booking?: Booking;
}

const CheckinForm = ({ booking }: CheckinFormProps) => {
  const [formSection, setFormSection] = useState(1);
  const schema = {
    // booking_code: z.string().optional(),
    // guest: z.string().optional(),
    guest_id: z.string(),
    guest_name: z.string(),
    gender: z.string(),
    email: z.string().email(),
    phone_number: z.string(),
  };
  const {} = useForm({});
  return (
    <>
      <form method="post">
        {formSection === 1 ? (
          <CheckinFormGuestDetails />
        ) : formSection === 2 ? (
          <CheckinFormReservationDetails />
        ) : (
          <CheckinFormPaymentDetails />
        )}
      </form>
    </>
  );
};

export default CheckinForm;
