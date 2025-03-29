import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import FilterField from "./FilterField";
import { useBooking } from "../contexts/BookingProvider";

export interface BookingFilterProps {
  bookingFilters: {
    bookingCode: string;
    guestName: string;
    roomType: string;
    checkInDate: string;
  };
  setBookingFilters: Dispatch<
    SetStateAction<{
      bookingCode: string;
      guestName: string;
      roomType: string;
      checkInDate: string;
    }>
  >;
}

const BookingsFilter = ({
  bookingFilters,
  setBookingFilters,
}: BookingFilterProps) => {
  return (
    <Box>
      <Heading>Search Booking</Heading>
      <Flex wrap={"wrap"} gap="5px">
        <FilterField
          type="text"
          //   fieldLabel="Booking Code"
          placeholder="Booking Code"
          value={bookingFilters.bookingCode}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              bookingCode: e.target.value,
            })
          }
        />
        <FilterField
          type="text"
          //   fieldLabel="Guest Name"
          placeholder="Guest Name"
          value={bookingFilters.guestName}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              guestName: e.target.value,
            })
          }
        />
        {/* <FilterField
          type="text"
        //   fieldLabel="Room #"
          placeholder="room type"
          value={bookingFilters.roomNumber}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              roomNumber: e.target.value,
            })
          }
        /> */}
        <FilterField
          type="date"
          //   fieldLabel="Booking Date"
          placeholder="Booking Date"
          value={bookingFilters.checkInDate}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              checkInDate: e.target.value,
            })
          }
        />
      </Flex>
    </Box>
  );
};

export default BookingsFilter;
