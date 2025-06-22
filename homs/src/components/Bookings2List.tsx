import React from "react";
import { useBooking } from "../contexts/BookingProvider";
import { Box, Table } from "@chakra-ui/react";
import BookingsListRow from "./BookingsListRow";
import { BookingsFiltersProps } from "./Bookings2FilterForm";
import dayjs from "dayjs";

const Bookings2List = ({ bookingsFilters }: BookingsFiltersProps) => {
  const { bookings } = useBooking();
  let filteredBookings = bookings;

  filteredBookings = bookings.filter(
    (booking) =>
      booking.booking_code
        ?.toLowerCase()
        .includes(bookingsFilters.bookingCode.toLowerCase()) &&
      booking.guest_name
        ?.toLowerCase()
        .includes(bookingsFilters.guestName.toLowerCase()) &&
      (bookingsFilters.checkInDate
        ? booking.check_in_date
          ? dayjs(booking.check_in_date).isSame(
              dayjs(bookingsFilters.checkInDate, "YYYY-MM-DD"),
              "day"
            )
          : true
        : true)
    //   (booking.check_in_date
    //     ? dayjs(booking.check_in_date).isSame(
    //         dayjs(bookingsFilters.checkInDate, "YYYY-MM-DD"),
    //         "day"
    //       )
    //     : true)
    // dayjs(booking.check_in_date).isSame(
    //   dayjs(bookingsFilters.checkInDate, "YYYY-MM-DD"), "day")
  );

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
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Check-in Date
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Room Type
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Phone Number
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredBookings.map((booking) => (
            <BookingsListRow key={booking.booking_code} booking={booking} />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default Bookings2List;
