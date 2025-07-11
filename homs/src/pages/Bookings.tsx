import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Flex, Heading } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import BookingsFilter from "../components/BookingsFilter";
import BookingsList from "../components/BookingsList";
import BookingCreateDialog from "../components/BookingCreateDialog";
import ActionPageHeader from "../components/ActionPageHeader";

const Bookings = () => {
  const [open, setOpen] = useState(false);
  const [bookingFilters, setBookingFilters] = useState({
    bookingCode: "",
    guestName: "",
    roomType: "",
    checkInDate: "",
  });
  return (
    <>
      {/* <Flex justifyContent={"space-between"}>
        <Heading fontWeight={300} color="var(--header-bg)">
          Bookings
        </Heading>
        <BookingCreateDialog
          open={open}
          setOpen={setOpen}
          dialogTriggerBtn={
            <Button
              bg="var(--header-bg)"
              color="white"
              px="25px"
              borderRadius="50px"
              shadow="sm"
            >
              Add Booking
            </Button>
          }
        />
      </Flex> */}
      <ActionPageHeader heading="Booking" table="booking" />
      <BookingsFilter
        bookingFilters={bookingFilters}
        setBookingFilters={setBookingFilters}
      />
      <BookingsList
        bookingFilters={bookingFilters}
        setBookingFilters={setBookingFilters}
      />
    </>
  );
};

export default Bookings;
