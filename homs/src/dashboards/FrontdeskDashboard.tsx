import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Text } from "@chakra-ui/react";
import bookingServices from "../services/booking-services";
import roomService from "../services/room-service";
import { useBooking } from "../contexts/BookingProvider";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { BillingProvider } from "../contexts/BillingProvider";

const FrontdeskDashboard = () => {
  const { bookings, setBookings } = useBooking();
  const { setRoomRates } = useRoomSetup();

  useEffect(() => {
    const { request, cancel } = bookingServices.getBookings();
    request
      .then((response) => {
        setBookings(response.data);
        localStorage.setItem("bookings", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error.message);
      });
    return () => cancel();
  }, []);

  useEffect(() => {});

  useEffect(() => {
    const { request, cancel } = roomService.getRoomRates();
    request
      .then((response) => {
        setRoomRates(response.data);
        localStorage.setItem("roomRates", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching room rates:", error.message);
      });
    return () => cancel();
  }, []);
  return (
    <div>
      <Text>Frontdesk Dashboard</Text>
      <Text>Bookings: {bookings.length}</Text>
    </div>
  );
};

export default FrontdeskDashboard;
