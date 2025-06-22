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

function App() {
  return (
    <Provider>
      <AuthProvider>
        <HotelSetupProvider>
          <RoomSetupProvider>
            <BookingProvider>
              <Router>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/report-issue" element={<ReportIssue />} />
                  <Route path="/request-service" element={<RequestService />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/dashboard"
                    element={
                      <RoleProtectedRoute>
                        <Dashboard />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/room-categories"
                    element={
                      <RoleProtectedRoute>
                        <RoomCategories />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/my-tasks"
                    element={
                      <RoleProtectedRoute>
                        <MyTasks />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/room-types"
                    element={
                      <RoleProtectedRoute>
                        <RoomTypes />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/my-shifts"
                    element={
                      <RoleProtectedRoute>
                        <MyShifts />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/shift-details/:shiftId"
                    element={
                      <RoleProtectedRoute>
                        <ShiftDetails />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/rooms"
                    element={
                      <RoleProtectedRoute>
                        <Rooms />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/floors"
                    element={
                      <RoleProtectedRoute>
                        <Floors />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/hotel-views"
                    element={
                      <RoleProtectedRoute>
                        <Views />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/assign-shift"
                    element={
                      <RoleProtectedRoute>
                        <AssignShift />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/department-roster"
                    element={
                      <RoleProtectedRoute>
                        <DepartmentRoster />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/manage-shift"
                    element={
                      <RoleProtectedRoute>
                        <ManageShift />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/amenities"
                    element={
                      <RoleProtectedRoute>
                        <Amenities />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/task-updates"
                    element={
                      <RoleProtectedRoute>
                        <TaskUpdates />
                      </RoleProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/bed-types"
                    element={
                      <RoleProtectedRoute>
                        <BedTypes />
                      </RoleProtectedRoute>
                    }
                  />

                  <Route
                    path="/dashboard/bookings"
                    element={
                      <RoleProtectedRoute>
                        <Bookings2 />
                      </RoleProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </BookingProvider>
          </RoomSetupProvider>
        </HotelSetupProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
