import { Box, Flex, Input } from "@chakra-ui/react";
import "./Bookings2FilterForm.css";
import React, { useState } from "react";
import { Field } from "./ui/field";

export interface BookingsFiltersProps {
  bookingsFilters: {
    bookingCode: string;
    guestName: string;
    checkInDate: string;
  };
  setBookingsFilters: React.Dispatch<
    React.SetStateAction<{
      bookingCode: string;
      guestName: string;
      checkInDate: string;
    }>
  >;
}

const Bookings2FilterForm = ({
  bookingsFilters,
  setBookingsFilters,
}: BookingsFiltersProps) => {
  return (
    <Box className="bookings2-filter-form">
      <Flex justifyContent={"space-between"} wrap="wrap">
        <Box width={{ base: "100%", md: "31%" }}>
          <Field label="Booking Code">
            <Input
              className="bookings2-filter-form-input"
              type="text"
              value={bookingsFilters.bookingCode}
              onChange={(e) =>
                setBookingsFilters({
                  ...bookingsFilters,
                  bookingCode: e.target.value,
                })
              }
            />
          </Field>
        </Box>
        <Box width={{ base: "100%", md: "31%" }}>
          <Field label="Guest Name">
            <Input
              className="bookings2-filter-form-input"
              type="text"
              value={bookingsFilters.guestName}
              onChange={(e) =>
                setBookingsFilters({
                  ...bookingsFilters,
                  guestName: e.target.value,
                })
              }
            />
          </Field>
        </Box>
        <Box width={{ base: "100%", md: "31%" }}>
          <Field label="Check In Date">
            <Input
              className="bookings2-filter-form-input"
              type="date"
              value={bookingsFilters.checkInDate}
              onChange={(e) =>
                setBookingsFilters({
                  ...bookingsFilters,
                  checkInDate: e.target.value,
                })
              }
            />
          </Field>
        </Box>
      </Flex>
    </Box>
  );
};

export default Bookings2FilterForm;
