import { createContext, useContext, useState } from "react";

const HotelSetupContext = createContext({
  shifts: [],
  setShifts: (shifts: Shift[]) => {}
});

import { ReactNode } from "react";
import { Shift } from "../components/ShiftStaffListItem";

interface HotelSetupProviderProps {
  children: ReactNode;
}

export function HotelSetupProvider({ children }: HotelSetupProviderProps) {
  const [shifts, setShifts] = useState(
    JSON.parse(localStorage.getItem("shifts") ?? "[]")
  );
  return (
    <HotelSetupContext.Provider value={{ shifts, setShifts }}>
      {children}
    </HotelSetupContext.Provider>
  );
}

export const useHotelSetup = () => {
    return useContext(HotelSetupContext);
}
