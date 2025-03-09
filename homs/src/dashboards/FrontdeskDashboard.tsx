import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Text } from "@chakra-ui/react";
import bookingServices from "../services/booking-services";
import { useBooking } from "../contexts/BookingProvider";

const FrontdeskDashboard = () => {
  const [bookingsError, setBookingsError] = useState("");
  const { bookings, setBookings } = useBooking();
  
  return (
    <div>
      <DashboardLayout>
        <Text>Frontdesk Dashboard</Text>
      </DashboardLayout>
    </div>
  );
};

export default FrontdeskDashboard;
