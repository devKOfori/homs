import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { Container, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'


const HousekeepingDashboard = () => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default HousekeepingDashboard

