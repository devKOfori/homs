import {
  Box,
  Button,
  Container,
  Flex,
  List,
  MenuItem,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import menuItems from "../Menu";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import { Tooltip } from "./ui/tooltip";
import SidebarSearch from "./SidebarSearch";
import "./Sidebar.css";
import SidebarMenuList from "./SidebarMenuList";

interface SidebarProps {
  setHideSidebar: (value: boolean) => void;
  setSelectedMenu?: (value: string) => void;
  hideSidebar: boolean;
}

const Sidebar = ({
  setHideSidebar,
  hideSidebar,
  setSelectedMenu,
}: SidebarProps) => {
  return (
    <Box className="sidebar-container">
      {/* <Flex> */}
      <Box
        pt="15px"
        width="300px"
        className="sidebar"
        px={hideSidebar ? "0.6rem" : "2rem"}
      >
        {/* <SidebarSearch /> */}
        <Box className="hide-menu-button">
          <IconButton
            color="var(--logo-color)"
            size={"xs"}
            _hover={{
              bg: "var(--hairline-background-faint)",
              textDecoration: "underline",
            }}
            px="0.5rem"
            onClick={() => {
              setHideSidebar((prev) => !prev);
            }}
            className="hide-menu-icon"
          >
            {!hideSidebar ? (
              <RiMenuLine />
            ) : (
              <Tooltip content="Menu" openDelay={300}>
                <RiMenuLine />
              </Tooltip>
            )}{" "}
            {!hideSidebar && "Hide Menu"}
          </IconButton>
        </Box>
        {!hideSidebar && <SidebarMenuList data={menuItems} />}
      </Box>
      {/* </Flex> */}
    </Box>
  );
};

export default Sidebar;
