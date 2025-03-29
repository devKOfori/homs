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
  guest: Guest;
  guest_name?: string;
  email?: string;
  phone_number?: string;
  room_category?: string;
  room_type?: string;
  room_number?: string;
  booking_code?: string;
  check_in_date?: string;
  check_out_date?: string;
  number_of_older_guests?: number;
  number_of_younger_guests?: number;
  number_of_guests?: number;
  rate?: number;
  amount_paid?: number;
  promo_code?: string;
  vip_status?: string;
  sponsor?: string;
  payment_status?: string;
  created_by?: string;
  notes?: string;
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
