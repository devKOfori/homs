import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Drawer,
  Portal,
} from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import SidebarMenuList from "../components/SidebarMenuList";
import menuItems from "../Menu";
import { Outlet } from "react-router-dom";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
const DashboardLayout = () => {
  const [hideSidebar, setHideSidebar] = useState<boolean>(false);

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
          <Sidebar setHideSidebar={setHideSidebar} hideSidebar={hideSidebar} />
        </GridItem>
        <GridItem area="main" h="calc(100vh - 60px)" overflow="scroll">
          <Box
            className="menu-button-on-main"
            display={{ base: "block", lg: "none" }}
            // pl="0.5rem"
          >
            <Drawer.Root placement={"start"}>
              <Drawer.Trigger>
                <IconButton
                  color="var(--logo-color)"
                  size={"xs"}
                  _hover={{
                    bg: "var(--hairline-background-faint)",
                    textDecoration: "underline",
                  }}
                >
                  <RiMenuLine />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner p="3.8rem 0 0 0">
                  <Drawer.Content bg="var(--normal-bg)" width="300px">
                    <Drawer.Header py="0.94rem">
                      <Drawer.Title>
                        <IconButton
                          color="var(--logo-color)"
                          size={"xs"}
                          _hover={{
                            bg: "var(--hairline-background-faint)",
                            textDecoration: "underline",
                          }}
                        >
                          <RiMenuLine /> Menu
                        </IconButton>
                      </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <SidebarMenuList data={menuItems} />
                    </Drawer.Body>
                    <Drawer.CloseTrigger>
                      <IconButton>
                        <RiCloseLine />
                      </IconButton>
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </Box>
          {/* <Box p={{ base: "1rem 0.5rem", lg: "1rem 2rem" }}>{children}</Box> */}
          <Box p={{ base: "1rem 0.5rem", lg: "1rem 2rem" }}><Outlet /></Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default DashboardLayout;
