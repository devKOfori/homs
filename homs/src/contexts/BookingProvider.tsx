import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import bookingServices from "../services/booking-services";
import { useAuth } from "./AuthProvider";

export type Title = {
  id: string;
  name: string;
};

export type Guest = {
  id?: string;
  guest_id?: string;
  title?: string;
  first_name: string;
  last_name: string;
  gender: string;
  email?: string;
  phone_number?: string;
  address?: string;
  identification_type?: string;
  identification_number?: string;
  country: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
};

export type Booking = {
  id?: string;
  guest?: Guest;
  guest_name?: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  room_type?: string;
  room_category?: string;
  number_of_guests?: number;
  number_of_children_guests?: number;
  booking_code?: string;
  check_in_date?: string;
  check_out_date?: string;
  note?: string;
  booking_source?: string;
  booking_status?: string;
  booking_cost?: number;
  payment_status?: string;
  booking_category?: string;
  date_created?: string;
  created_by?: string;
};

export type Gender = {
  id: string;
  name: string;
};

export type Country = {
  id: string;
  name: string;
  country_code: string;
  abbr: string;
};

export type IdentificationType = {
  id?: string;
  name: string;
};

export interface BookingContextProps {
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  addNewBooking: (booking: Booking) => void;
  bookingsFetchError?: string;
  setBookingsFetchError?: Dispatch<SetStateAction<string>>;
  
}

const BookingContext = createContext<BookingContextProps>({
  bookings: [],
  setBookings: () => {},
  addNewBooking: () => {},
  bookingsFetchError: "",
  setBookingsFetchError: () => {},
});

interface BookingProviderProps {
  children: React.ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [bookingsFetchError, setBookingsFetchError] = useState("");

  const [bookings, setBookings] = useState<Booking[]>([]);


  useEffect(() => {
    const { request, cancel } = bookingServices.getBookings();
    request.then((response) => {
      setBookings(response.data);
      console.log(response.data);
      localStorage.setItem("bookings", JSON.stringify(response.data));
    });
    request.catch((error) => {
      setBookingsFetchError(error.message);
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  const addNewBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem("bookings", JSON.stringify(newBookings));
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        addNewBooking,
        bookingsFetchError,
        setBookingsFetchError,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext<BookingContextProps>(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
