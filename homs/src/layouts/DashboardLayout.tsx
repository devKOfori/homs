import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Box, Container, Grid, GridItem } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const DashboardLayout: React.FC = ({ children }: React.ReactNode) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const templateAreas = {
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`
    }
    const asideWidth = isSidebarOpen ? '300px' : '33px'
    const gridTemplateColumns = {lg: `${asideWidth} 1fr`}
    const asideDisplay = { base: "none", lg: "block" }
  return (
    <div>
        <Grid templateAreas={templateAreas} gridTemplateColumns={gridTemplateColumns} columnGap='30px'>
            <GridItem area='nav' border='1px solid red' minH='60px'>
                <Navbar />
            </GridItem>
            <GridItem area='aside' display={asideDisplay} border='1px solid yellow' minH='calc(100vh - 60px)' overflow='hidden'>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </GridItem>
            <GridItem area='main' border='1px solid green' minH='calc(100vh - 60px)'>
                <Box p='20px 40px'>  
                    {children}
                </Box>
            </GridItem>
        </Grid>
    </div>
  )
}

export default DashboardLayout
