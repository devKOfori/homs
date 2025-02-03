import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Box, Grid, GridItem } from '@chakra-ui/react'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [selectedMenu, setSelectedMenu] = useState('')

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
            <GridItem area='nav' minH='60px'>
                <Navbar />
            </GridItem>
            <GridItem area='aside' display={asideDisplay} h='calc(100vh - 60px)' overflow='hidden' borderRight='1px solid var(--hairline-color)'>
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            </GridItem>
            <GridItem area='main' h='calc(100vh - 60px)' overflow='scroll'>
                <Box p='20px 40px'>  
                    {children}
                </Box>
            </GridItem>
        </Grid>
    </div>
  )
}

export default DashboardLayout
