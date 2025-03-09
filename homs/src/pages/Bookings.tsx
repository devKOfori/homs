import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Flex, Heading } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import BookingsFilter from "../components/BookingsFilter";
import BookingsList from "../components/BookingsList";

const Bookings = () => {
  return (
    <DashboardLayout>
      <Flex justifyContent={"space-between"}>
        <Heading fontWeight={300} color="var(--header-bg)">
          Bookings
        </Heading>
        <Button
          bg="var(--header-bg)"
          color="white"
          px="25px"
          borderRadius="50px"
          shadow="sm"
        >
          Add Booking
        </Button>
      </Flex>
      <BookingsFilter />
      <BookingsList />
    </DashboardLayout>
  );
};

export default Bookings;
