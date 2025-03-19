import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import bookingServices from "../services/booking-services";

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
}

export interface BookingContextProps {
  titles: Title[];
  setTitles: Dispatch<SetStateAction<Title[]>>;
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  bookingsFetchError?: string;
  setBookingsFetchError?: Dispatch<SetStateAction<string>>;
  genders: Gender[];
  setGenders: Dispatch<SetStateAction<Gender[]>>;
  countries: Country[];
  setCountries: Dispatch<SetStateAction<Country[]>>;

}

const BookingContext = createContext<BookingContextProps>({
  titles: [],
  setTitles: () => {},
  bookings: [],
  setBookings: () => {},
  bookingsFetchError: "",
  setBookingsFetchError: () => {},
  genders: [],
  setGenders: () => {},
  countries: [],
  setCountries: () => {},
});

interface BookingProviderProps {
  children: React.ReactNode;
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [titles, setTitles] = useState(
    localStorage.getItem("titles")
      ? JSON.parse(localStorage.getItem("titles") ?? "[]")
      : []
  );
  const [bookingsFetchError, setBookingsFetchError] = useState("");

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [genders, setGenders] = useState<Gender[]>([]);

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") ?? "[]");
    if (storedBookings.length > 0) {
      setBookings(storedBookings);
    } else {
      const { request } = bookingServices.getBookings();
      request.then((response) => {
        setBookings(response.data);
        console.log(response.data);
        localStorage.setItem("bookings", JSON.stringify(response.data));
      });
      request.catch((error) => {
        setBookingsFetchError(error.message);
        console.log(error.message);
      });
    }
  }, []);

  useEffect(() => {
    const storedGenders = JSON.parse(localStorage.getItem("genders") ?? "[]");
    if (storedGenders.length > 0) {
      setGenders(storedGenders);
    } else {
      const { request } = bookingServices.getGenders();
      request.then((response) => {
        setGenders(response.data);
        console.log(response.data);
        localStorage.setItem("genders", JSON.stringify(response.data));
      });
      request.catch((error) => {
        console.log(error.message);
      });
    }
  }, []);

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("countries") ?? "[]");
    if (storedCountries.length > 0) {
      setCountries(storedCountries);
    } else {
      const { request } = bookingServices.getCountries();
      request.then((response) => {
        setCountries(response.data);
        console.log(response.data);
        localStorage.setItem("countries", JSON.stringify(response.data));
      });
      request.catch((error) => {
        console.log(error.message);
      });
    }
  }, []);

  return (
    <BookingContext.Provider
      value={{
        titles,
        setTitles,
        bookings,
        setBookings,
        bookingsFetchError,
        setBookingsFetchError,
        genders,
        setGenders,
        countries,
        setCountries,
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
