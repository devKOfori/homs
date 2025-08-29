import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import CheckInList from "../components/CheckInList";
import SearchGuest from "../components/SearchGuest";
import CardDisplayCheckIn from "../components/CardDisplayCheckIn";
import { Box } from "@chakra-ui/react";
import CheckInListCard from "../components/CheckInListCard";

export interface CheckInProps {
  id?: string;
  booking_code?: string;
  guestName?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  identificationType?: string;
  identificationNumber?: string;
  country?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  roomType?: string;
  roomCategory?: string;
  roomNumber?: string;
  checkInDate?: string;
  numberOfGuests?: number;
  checkOutDate?: string;
  note?: string;
  checkedOut?: boolean;
  bookingCategory?: string;
  sponsor?: string;
  employeeID?: string;
  paymentType?: string;
  costPerNight?: number;
  totalCost?: number;
  depositPaid?: number;
  receipt?: string;
  createdBy?: string;
  dateCreated?: string;
  status?: string;
}

const CheckIn = () => {
  const [checkIns, setCheckIns] = useState<CheckInProps[]>([]); //retrieve checkIns from context
  return (
    <>
      <ActionPageHeader heading="Check In" table="checkin" />
      {/* <SearchGuest /> */}
      <Box display={{ base: "none", md: "block" }}>
        <CheckInList checkIns={checkIns} />
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        {/* <CardDisplayCheckIn /> */}
        <CheckInListCard checkIns={checkIns} />
      </Box>
    </>
  );
};

export default CheckIn;
