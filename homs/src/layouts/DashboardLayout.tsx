import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Container, Grid, GridItem } from '@chakra-ui/react'

const DashboardLayout: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const templateAreas = {
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`
    }
    const asideDisplay = { base: "none", lg: "block" }
  return (
    <div>
        <Grid templateAreas={templateAreas}>
            <GridItem area='nav'>
                <Navbar />
            </GridItem>
            <GridItem area='aside' display={asideDisplay}>
                <Sidebar />
            </GridItem>
            <GridItem area='main'>
                <Container>
                    {children}
                </Container>
            </GridItem>
        </Grid>
    </div>
  )
}

export default DashboardLayout
