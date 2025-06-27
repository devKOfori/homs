// ProtectedAppLayout.tsx
import { Outlet } from "react-router-dom";
import { RoomSetupProvider } from "../contexts/RoomSetupProvider";
import { HotelSetupProvider } from "../contexts/HotelSetupProvider";
import { BookingProvider } from "../contexts/BookingProvider";
import { BillingProvider } from "../contexts/BillingProvider";

export default function ProtectedAppLayout() {
  return (
    <HotelSetupProvider>
      <RoomSetupProvider>
        <BookingProvider>
          <BillingProvider>
            <Outlet />
          </BillingProvider>
        </BookingProvider>
      </RoomSetupProvider>
    </HotelSetupProvider>
  );
}
