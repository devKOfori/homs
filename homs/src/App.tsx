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

function App() {
  // const userDepartment = localStorage.getItem('department')
  // console.log(`user department: ${userDepartment}`)

  return (
    <Provider>
      <AuthProvider>
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
        </Routes>
      </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App
