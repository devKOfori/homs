import { createContext, useContext, useState } from "react";

type CheckInContextProps = {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  activeRate: number | null;
  setActiveRate: (rate: number | null) => void;
};

const CheckInContext = createContext<CheckInContextProps | undefined>(
  undefined
);

export const CheckInProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [activeRate, setActiveRate] = useState<number | null>(0);
  return (
    <CheckInContext.Provider
      value={{ selectedRoom, setSelectedRoom, activeRate, setActiveRate }}
    >
      {children}
    </CheckInContext.Provider>
  );
};

export const useCheckInContext = () => {
  const context = useContext(CheckInContext);
  if (!context) {
    throw new Error("useCheckInContext must be used within a CheckInProvider");
  }
  return context;
};
