import { Box, Table } from "@chakra-ui/react";
import React, { useState } from "react";
import bookingServices from "../services/booking-services";
import { BookingContextProps, useBooking } from "../contexts/BookingProvider";
import BookingsListRow from "./BookingsListRow";


const BookingsList = () => {
  const { bookings, setBookings, bookingsFetchError } = useBooking();
  return (
    <Box overflow='auto'>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Booking ID
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Guest Name
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Room #
            </Table.ColumnHeader> */}
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Check-in Date
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Check-out Date
            </Table.ColumnHeader> */}
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Room Type
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Payment Status
            </Table.ColumnHeader> */}
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Number of Guests
            </Table.ColumnHeader> */}
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Phone Number
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              Email
            </Table.ColumnHeader> */}
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="15px"
              whiteSpace={"nowrap"}
              minW="150px"
            >
              VIP Status
            </Table.ColumnHeader> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            bookings.length > 0 ? (
              bookings.map(booking => (
              <BookingsListRow key={booking.id} booking={booking} />
            ))): (
              <Table.Row>
                <Table.Cell colSpan={11} px="30px" py="15px" bg='white' color='black'>
                  {bookingsFetchError || "No bookings found"}
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default BookingsList;
