import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider'
import './App.css'
import Home from './pages/Home'
import ReportIssue from './components/ReportIssue'
import RequestService from './pages/RequestService'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import { AuthProvider } from './contexts/AuthProvider'
import RoomCategories from './pages/RoomCategories'
import RoomTypes from './pages/RoomTypes'
import Rooms from './pages/Rooms'
import AssignShift from './pages/AssignShift'
import ManageShift from './pages/ManageShift'
import MyShifts from './pages/MyShifts'
import { RoomSetupProvider } from './contexts/RoomSetupProvider'
import Floors from './pages/Floors'
import Views from './pages/Views'

function App() {

  return (
    <Provider>
      <AuthProvider>
      <RoomSetupProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/report-issue' element={<ReportIssue />} />
          <Route path='/request-service' element={<RequestService />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <RoleProtectedRoute>
            <Dashboard  />
            </RoleProtectedRoute>
          } />
          <Route path='/dashboard/room-categories' element={
            <RoleProtectedRoute>
              <RoomCategories />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/room-types' element={
            <RoleProtectedRoute>
              <RoomTypes />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/my-shifts' element={
            <RoleProtectedRoute>
              <MyShifts />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/rooms' element={
            <RoleProtectedRoute>
              <Rooms />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/floors' element={
            <RoleProtectedRoute>
              <Floors />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/hotel-views' element={
            <RoleProtectedRoute>
              <Views />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/assign-shift' element={
            <RoleProtectedRoute>
              <AssignShift />
            </RoleProtectedRoute>
            } />
          <Route path='/dashboard/manage-shift' element={
            <RoleProtectedRoute>
              <ManageShift />
            </RoleProtectedRoute>
            } />
        </Routes>
      </Router>
      </RoomSetupProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
