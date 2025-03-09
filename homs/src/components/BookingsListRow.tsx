import { Table } from "@chakra-ui/react";
import React from "react";
import { Booking } from "../contexts/BookingProvider";

interface Props {
    booking: Booking;
}

const BookingsListRow = ({ booking }: Props) => {
  return (
    <Table.Row key={booking.id}>
      <Table.Cell px="30px" py="15px">
        {booking.id}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.guest_name}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.room_number}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.check_in_date}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.check_out_date}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.room_type}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.payment_status}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.number_of_guests}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.phone_number}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.email}
      </Table.Cell>
      <Table.Cell px="30px" py="15px">
        {booking.vip_status}
      </Table.Cell>
    </Table.Row>
  );
};

export default BookingsListRow;
