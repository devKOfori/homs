import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import FilterField from "./FilterField";

const BookingsFilter = () => {
  const [bookingFilters, setBookingFilters] = useState({
    bookingCode: "",
    guestName: "",
    roomNumber: "",
    bookingDate: "",
  });
  return (
    <Box>
      <Heading>Search Booking</Heading>
      <Flex wrap={'wrap'} gap='5px'>
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
        <FilterField
          type="text"
        //   fieldLabel="Room #"
          placeholder="room #"
          value={bookingFilters.roomNumber}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              roomNumber: e.target.value,
            })
          }
        />
        <FilterField
          type="date"
        //   fieldLabel="Booking Date"
          placeholder="Booking Date"
          value={bookingFilters.bookingDate}
          onChange={(e) =>
            setBookingFilters({
              ...bookingFilters,
              roomNumber: e.target.value,
            })
          }
        />
      </Flex>
    </Box>
  );
};

export default BookingsFilter;
