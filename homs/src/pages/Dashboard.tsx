import { useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import FrontdeskDashboard from "../dashboards/FrontdeskDashboard";
import HousekeepingDashboard from "../dashboards/HousekeepingDashboard";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import amenityService from "../services/amenity-service";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import authService from "../services/auth-service";
import hotelService from "../services/hotel-service";
import bookingServices from "../services/booking-services";

const Dashboard = () => {
  const { setRoomCategories, setBedTypes, setRooms, setFloors, setAmenities } = useRoomSetup();

  useEffect(() => {
    const { request, cancel } = authService.getMyDepartmentStaffList();
    request.then((response) => {
      localStorage.setItem("myDepartmentStaffList", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getRoomTypes();
    request.then((response) => {
      localStorage.setItem("roomTypes", JSON.stringify(response.data));
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
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
      // console.log(error.message);
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
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getFloors();
    request.then((response) => {
      setFloors(response.data);
      localStorage.setItem("floors", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getBedTypes();
    request.then((response) => {
      // console.log(response.data);
      setBedTypes(response.data);
      localStorage.setItem("bedTypes", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
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
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = roomService.getRooms();
    request.then((response) => {
      setRooms(response.data);
      localStorage.setItem("rooms", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const {request, cancel} = hotelService.getShifts();
    request.then((response) => {
      localStorage.setItem("shifts", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const {request, cancel} = hotelService.getShiftStatuses();
    request.then((response) => {
      localStorage.setItem("shiftStatuses", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = hotelService.getPriorities();
    request.then((response) => {
      localStorage.setItem("priorities", JSON.stringify(response.data));
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      // console.log(error.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = bookingServices.getTitles();
    request.then((res) => {
      localStorage.setItem("titles", JSON.stringify(res.data));
    });
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      // console.log(err.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = bookingServices.getGenders();
    request.then((res) => {
      localStorage.setItem("genders", JSON.stringify(res.data));
    });
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      // console.log(err.message);
    });
    return () => cancel();
    }, []);

  useEffect(() => {
    const { request, cancel } = bookingServices.getCountries();
    request.then((res) => {
      localStorage.setItem("countries", JSON.stringify(res.data));
    });
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      // console.log(err.message);
    });
    return () => cancel();
  }, []);

  useEffect(() => {
    const { request, cancel } = bookingServices.getIdentificationTypes();
    request.then((res) => {
      localStorage.setItem("identificationTypes", JSON.stringify(res.data));
    });
    request.catch((err) => {
      if (err instanceof CanceledError) return;
      // console.log(err.message);
    });
    return () => cancel();
  }, []);

  const { auth: {department} } = useAuth();
  // console.log(`Department: ${department}`)
  switch (department) {
    case "Frontdesk":
      return <FrontdeskDashboard />;

    case "Housekeeping":
      return <HousekeepingDashboard />;
  }
};

export default Dashboard;
