import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import Bookings2FilterForm from "../components/Bookings2FilterForm";
import Bookings2List from "../components/Bookings2List";
import dayjs from "dayjs";

const Bookings2 = () => {
  const [bookingsFilters, setBookingsFilters] = useState({
    bookingCode: "",
    guestName: "",
    checkInDate: dayjs().toISOString().split("T")[0],
  });

  return (
    <>
      <ActionPageHeader heading="Booking" table="booking" />
      <Bookings2FilterForm
        bookingsFilters={bookingsFilters}
        setBookingsFilters={setBookingsFilters}
      />
      <Bookings2List
        bookingsFilters={bookingsFilters}
        setBookingsFilters={setBookingsFilters}
      />
    </>
  );
};

export default Bookings2;
