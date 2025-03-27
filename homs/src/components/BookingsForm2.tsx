import React, { useState } from "react";
import BookingsGuestInfoForm from "./BookingsGuestInfoForm";
import BookingsRoomInfoForm from "./BookingsRoomInfoForm";
import BookingsPaymentInfoForm from "./BookingsPaymentInfoForm";
import { Button } from "./ui/button";
import { Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import bookingService from "../services/booking-services";
import { Booking, useBooking } from "../contexts/BookingProvider";

interface Props {
  setDialogOpened: (value: boolean) => void;
}

const BookingsForm2 = ({ setDialogOpened }: Props) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const { setBookings } = useBooking();

  const guestInfoSchema = z.object({
    title: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email().optional(),
    phone_number: z.string().optional(),
    gender: z.string(),
    country: z.string(),
    address: z.string().optional(),
    identification_type: z.string().optional(),
    identification_number: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_number: z.string().optional(),
  });

  const roomInfoSchema = z.object({
    room_type: z.string().optional(),
    check_in_date: z.string(),
    check_out_date: z.string().optional(),
    number_of_older_guests: z.coerce.number(),
    number_of_younger_guests: z.coerce.number().optional(),
    notes: z.string().optional(),
  });

  const paymentDetailsSchema = z.object({
    rate: z.coerce.number().readonly(),
    amount_paid: z.coerce.string().optional(),
    payment_id: z.string().optional(),
  });

  console.log(guestInfoSchema);

  const fullSchema = guestInfoSchema
    .and(roomInfoSchema)
    .and(paymentDetailsSchema);

  type formInputType = z.infer<typeof fullSchema>;
  console.log(fullSchema);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fullSchema),
  });

  console.log(errors);

  const prevStep = () => {
    setStep(step - 1);
  };

  const nextStep = async () => {
    // const isValid = await trigger();
    // if (isValid) {
    //   setStep(step + 1);
    // }
    const values = getValues();
    let isValid = false;
    console.log(values);
    switch (step) {
      case 1:
        isValid = guestInfoSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(guestInfoSchema.shape));
        }
        break;
      case 2:
        isValid = roomInfoSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(roomInfoSchema.shape));
        }
        break;
      case 3:
        isValid = paymentDetailsSchema.safeParse(values).success;
        if (!isValid) {
          await trigger(Object.keys(paymentDetailsSchema.shape));
        }
        break;
    }
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit = (data: formInputType) => {
    console.log(data);
    const booking: Booking = {
      guest: {
        title: data.title,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender,
        email: data.email,
        phone_number: data.phone_number,
        address: data.address,
        identification_type: data.identification_type,
        identification_number: data.identification_number,
        country: data.country,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_number,
      },
      room_type: data.room_type,
      check_in_date: data.check_in_date,
      check_out_date: data.check_out_date,
      number_of_older_guests: data.number_of_older_guests,
      number_of_younger_guests: data.number_of_younger_guests,
      notes: data.notes,
    };
    const request = bookingService.createBooking(booking);
    request.then((response) => {
      setBookings((prev) => [response.data, ...prev]);
      console.log("booking created successfully");
      setDialogOpened(false);
    });
    request.catch((error) => {
      setError(error.message);
      console.log(error);
    });
  };

  return (
    <Box px="50px">
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <BookingsGuestInfoForm register={register} />}
        {step === 2 && <BookingsRoomInfoForm register={register} />}
        {step === 3 && <BookingsPaymentInfoForm register={register} />}

        <Box>
          {step > 1 && <Button onClick={prevStep}>Back</Button>}
          {step < 3 && <Button onClick={nextStep}>Next</Button>}
          {step === 3 && <Button type="submit">Save</Button>}
        </Box>
      </form>
    </Box>
  );
};

export default BookingsForm2;
