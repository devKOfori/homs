import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import FrontdeskDashboard from "../dashboards/FrontdeskDashboard";
import HousekeepingDashboard from "../dashboards/HousekeepingDashboard";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import amenityService from "../services/amenity-service";
import { useRoomSetup } from "../contexts/RoomSetupProvider";

const Dashboard = () => {
  const { setRoomCategories } = useRoomSetup();

  useEffect(() => {
    const { request, cancel } = roomService.getRoomTypes();
    request.then((response) => {
      localStorage.setItem("roomTypes", JSON.stringify(response.data));
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getRoomCategories();
    request.then((response) => {
      console.log(response.data);
      setRoomCategories(response.data);
      localStorage.setItem("roomCategories", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getAmenities();
    request.then((response) => {
      localStorage.setItem("amenities", JSON.stringify(response.data));
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getFloors();
    request.then((response) => {
      localStorage.setItem("floors", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getBedTypes();
    request.then((response) => {
      localStorage.setItem("bedTypes", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getHotelViews();
    request.then((response) => {
      localStorage.setItem("hotelViews", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getRooms();
    request.then((response) => {
      localStorage.setItem("rooms", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  const { department } = useAuth();
  // console.log(`Department: ${department}`)
  switch (department) {
    case "Frontdesk":
      return <FrontdeskDashboard />;

    case "Housekeeping":
      return <HousekeepingDashboard />;
  }
};

export default Dashboard;
