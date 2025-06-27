import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from "./components/ui/provider";
import "./App.css";
import Home from "./pages/Home";
import ReportIssue from "./components/ReportIssue";
import RequestService from "./pages/RequestService";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { AuthProvider } from "./contexts/AuthProvider";
import RoomCategories from "./pages/RoomCategories";
import RoomTypes from "./pages/RoomTypes";
import Rooms from "./pages/Rooms";
import AssignShift from "./pages/AssignShift";
import ManageShift from "./pages/ManageShift";
import MyShifts from "./pages/MyShifts";
import { RoomSetupProvider } from "./contexts/RoomSetupProvider";
import Floors from "./pages/Floors";
import Views from "./pages/Views";
import Amenities from "./pages/Amenities";
import BedTypes from "./pages/BedTypes";
import DepartmentRoster from "./pages/DepartmentRoster";
import ShiftDetails from "./pages/ShiftDetails";
import TaskUpdates from "./pages/TaskUpdates";
import ResetPassword from "./pages/ResetPassword";
import { HotelSetupProvider } from "./contexts/HotelSetupProvider";
import MyTasks from "./pages/MyTasks";
import Bookings from "./pages/Bookings";
import { BookingProvider } from "./contexts/BookingProvider";
import Bookings2 from "./pages/Bookings2";
import CheckIn from "./pages/CheckIn";
import RoomRates from "./pages/RoomRates";
import ProtectedAppLayout from "./components/ProtectedAppLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
   return (
     <Provider>
       <AuthProvider>
         <Router>
           <Routes>
             <Route index element={<Home />} />
             <Route path="/report-issue" element={<ReportIssue />} />
             <Route path="/request-service" element={<RequestService />} />
             <Route path="/login" element={<Login />} />
             <Route path="/reset-password" element={<ResetPassword />} />

             <Route
               element={
                 <RoleProtectedRoute>
                   <ProtectedAppLayout />
                 </RoleProtectedRoute>
               }
             >
               <Route path="/dashboard" element={<DashboardLayout />}>
                 <Route index element={<Dashboard />} />
                 <Route
                   path="/dashboard/room-categories"
                   element={<RoomCategories />}
                 />
                 <Route path="/dashboard/my-tasks" element={<MyTasks />} />
                 <Route path="/dashboard/room-types" element={<RoomTypes />} />
                 <Route path="/dashboard/my-shifts" element={<MyShifts />} />
                 <Route
                   path="/dashboard/shift-details/:shiftId"
                   element={<ShiftDetails />}
                 />
                 <Route path="/dashboard/rooms" element={<Rooms />} />
                 <Route path="/dashboard/floors" element={<Floors />} />
                 <Route path="/dashboard/hotel-views" element={<Views />} />
                 <Route
                   path="/dashboard/assign-shift"
                   element={<AssignShift />}
                 />
                 <Route
                   path="/dashboard/department-roster"
                   element={<DepartmentRoster />}
                 />
                 <Route
                   path="/dashboard/manage-shift"
                   element={<ManageShift />}
                 />
                 <Route path="/dashboard/amenities" element={<Amenities />} />
                 <Route
                   path="/dashboard/task-updates"
                   element={<TaskUpdates />}
                 />
                 <Route path="/dashboard/bed-types" element={<BedTypes />} />
                 <Route path="/dashboard/bookings" element={<Bookings2 />} />
                 <Route path="/dashboard/check-ins" element={<CheckIn />} />
                 <Route path="/dashboard/room-rates" element={<RoomRates />} />
               </Route>
             </Route>
           </Routes>
         </Router>
       </AuthProvider>
     </Provider>
   );
}

export default App;
