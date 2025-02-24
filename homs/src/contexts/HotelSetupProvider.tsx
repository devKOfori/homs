import { createContext, useContext, useState, ReactNode } from "react";
import { Shift } from "../components/ShiftStaffListItem";

interface HotelSetupContextType {
  shifts: Shift[];
  shiftStatuses: { id: string; name: string }[];
  priorities: { id: string; name: string }[];
  setPriorities: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  setShiftStatuses: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
}

const HotelSetupContext = createContext<HotelSetupContextType | undefined>(
  undefined
);

interface HotelSetupProviderProps {
  children: ReactNode;
}

const getStoredShifts = (): Shift[] => {
  try {
    return JSON.parse(localStorage.getItem("shifts") ?? "[]");
  } catch (error) {
    console.error("Error reading shifts from localStorage", error);
    return [];
  }
};
const getStoredShiftStatuses = (): { id: string; name: string }[] => {
  try {
    return JSON.parse(localStorage.getItem("shiftStatuses") ?? "[]");
  } catch (error) {
    console.error("Error reading shift statuses from localStorage", error);
    return [];
  }
};
const getStoredPriorities = (): { id: string; name: string }[] => {
  try {
    return JSON.parse(localStorage.getItem("priorities") ?? "[]");
  } catch (error) {
    console.error("Error reading priorities from localStorage", error);
    return [];
  }
};

// console.log(getStoredShifts());

export function HotelSetupProvider({ children }: HotelSetupProviderProps) {
  const [shifts, setShifts] = useState<Shift[]>(getStoredShifts());
  const [shiftStatuses, setShiftStatuses] = useState<
    { id: string; name: string }[]
  >(getStoredShiftStatuses());
  const [priorities, setPriorities] = useState<{ id: string; name: string }[]>(
    getStoredPriorities()
  );

  return (
    <HotelSetupContext.Provider
      value={{
        shifts,
        setShifts,
        shiftStatuses,
        setShiftStatuses,
        priorities,
        setPriorities,
      }}
    >
      {children}
    </HotelSetupContext.Provider>
  );
}

export const useHotelSetup = () => {
  const context = useContext(HotelSetupContext);
  if (!context) {
    throw new Error("useHotelSetup must be used within a HotelSetupProvider");
  }
  return context;
};
