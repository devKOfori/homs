import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Container } from '@chakra-ui/react'

const DashboardLayout: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default DashboardLayout
