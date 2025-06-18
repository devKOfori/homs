import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [hideSidebar, setHideSidebar] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const templateAreas = {
    base: `"nav" "main"`,
    lg: `"nav nav" "aside main"`,
  };
  const asideWidth = hideSidebar ? "3.5rem" : "18.75rem";
  const gridTemplateColumns = { lg: `${asideWidth} 1fr` };
  const asideDisplay = { base: "none", lg: "block" };
  return (
    <div>
      <Grid
        templateAreas={templateAreas}
        gridTemplateColumns={gridTemplateColumns}
        columnGap="0"
      >
        <GridItem area="nav" height="3.8rem">
          <Navbar />
        </GridItem>
        <GridItem
          area="aside"
          display={asideDisplay}
          // h="calc(100vh - 45px)"
          overflow="hidden"
          borderRight="1px solid var(--hairline-color)"
        >
          <Sidebar
            setHideSidebar={setHideSidebar}
            hideSidebar={hideSidebar}
            setSelectedMenu={setSelectedMenu}
          />
        </GridItem>
        <GridItem area="main" h="calc(100vh - 60px)" overflow="scroll">
          <Box p="20px 40px">{children}</Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default DashboardLayout;
