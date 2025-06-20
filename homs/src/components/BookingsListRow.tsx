import { Table } from "@chakra-ui/react";
import React from "react";
import { Booking } from "../contexts/BookingProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { VscSignIn } from "react-icons/vsc";
import CustomDialog from "./CustomDialog";
import CheckinForm from "./CheckinForm";

dayjs.extend(relativeTime);

interface Props {
  booking: Booking;
}

const BookingsListRow = ({ booking }: Props) => {
  return (
    <Table.Row key={booking.booking_code} bg="white">
      <Table.Cell className="table-row-cell">
        {booking.booking_code}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        {booking.guest_name}
      </Table.Cell>
      {/* <Table.Cell className="table-row-cell">
        {booking.room_number}
      </Table.Cell> */}
      <Table.Cell className="table-row-cell">
        {booking.check_in_date
          ? dayjs(booking.check_in_date).format("DD/MM/YYYY")
          : // ? dayjs(booking.check_in_date).fromNow()
            "N/A"}
      </Table.Cell>
      {/* <Table.Cell className="table-row-cell">
        {booking.check_out_date}
      </Table.Cell> */}
      <Table.Cell className="table-row-cell">
        {booking.room_type}
      </Table.Cell>
      {/* <Table.Cell className="table-row-cell">
        {booking.payment_status}
      </Table.Cell> */}
      {/* <Table.Cell className="table-row-cell">
        {booking.number_of_guests}
      </Table.Cell> */}
      <Table.Cell className="table-row-cell">
        {booking.phone_number}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        <CustomDialog dialogTitle='Check-In Form' dialogTriggerIcon={<VscSignIn />} dialogBody={<CheckinForm />} />
      </Table.Cell>
      {/* <Table.Cell className="table-row-cell">
        {booking.email}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        {booking.vip_status}
      </Table.Cell> */}
    </Table.Row>
  );
};

export default BookingsListRow;
