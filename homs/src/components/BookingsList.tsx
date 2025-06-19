import { Box, Table } from "@chakra-ui/react";
import React, { useState } from "react";
import bookingServices from "../services/booking-services";
import {
  Booking,
  BookingContextProps,
  useBooking,
} from "../contexts/BookingProvider";
import BookingsListRow from "./BookingsListRow";
import { BookingFilterProps } from "./BookingsFilter";
import dayjs from "dayjs";

const BookingsList = ({ bookingFilters }: BookingFilterProps) => {
  const { bookings, setBookings, bookingsFetchError } = useBooking();
  // const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  let filteredBookings = bookings;
  filteredBookings = bookings.filter(
    (booking) =>
      // setFilteredBookings(bookings.filter((booking)=>(
      booking.booking_code
        ?.toLowerCase()
        .includes(bookingFilters.bookingCode.toLowerCase()) &&
      booking.guest_name
        ?.toLowerCase()
        .includes(bookingFilters.guestName.toLowerCase()) &&
      booking.room_type
        ?.toLowerCase()
        .includes(bookingFilters.roomType.toLowerCase())
      // (booking.check_in_date ? dayjs(booking.check_in_date).isSame(dayjs(bookingFilters.checkInDate, "YYYY-MM-DD"), "day") : )
      // dayjs(booking.check_in_date).isSame(dayjs(bookingFilters.checkInDate, "YYYY-MM-DD"), "day")
  );
  console.log("Filtered Bookings: ", filteredBookings.length);
  console.log("Bookings List: ", bookings);
  return (
    <Box overflow="auto">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Booking ID
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
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
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingsListRow key={booking.id} booking={booking} />
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={11}
                px="30px"
                py="15px"
                bg="white"
                color="black"
                className="table-row-cell"
              >
                {bookingsFetchError || "No bookings found"}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default BookingsList;
