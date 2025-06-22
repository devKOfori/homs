import { Box, Flex, Icon, Menu, Portal } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import React, { useState } from "react";
import "./Navbar.css";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CiUser } from "react-icons/ci";
import { IconButton } from "@chakra-ui/react";
import { CiBellOn } from "react-icons/ci";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Navbar = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const navigate = useNavigate();
  const {
    auth: { username, accessToken, refreshToken },
  } = useAuth();
  // console.log(refreshToken);
  const logout = () => {
    const request = authService.logout(accessToken ?? "", refreshToken ?? "");
    request.then((_) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("profileId");
      localStorage.removeItem("department");
      localStorage.removeItem("roles");
      navigate("/login");
    });
    request.catch((error) => {
      console.log(error.response.data.detail);
      // Add a toast message here
    });
  };
  const navbarPadding = { base: "0.5rem", lg: "6.25rem" };
  return (
    <Box h="100%" className="navbar">
      <Flex
        justify={"space-between"}
        align="center"
        h="100%"
        px={navbarPadding}
        wrap="wrap"
      >
        <Box className="logo" fontWeight={600}>
          HOMS
        </Box>
        <Box className="user-info">
          <Flex>
            <Box>
              <IconButton
                className="notification-icon"
                _hover={{ bg: "var(--hairline-background-faint)" }}
              >
                <CiBellOn />
              </IconButton>
            </Box>
            <Box>
              <Menu.Root>
                <Menu.Trigger className="user-info-trigger" asChild>
                  <IconButton
                    className="user-profile-icon"
                    onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}
                  >
                    <Flex>
                      <CiUser />
                    </Flex>
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content className="user-info-content">
                      <Menu.Item
                        value="new-txt"
                        className="user-info-content-item"
                      >
                        My Profile
                      </Menu.Item>
                      <Menu.Item
                        value="new-file"
                        className="user-info-content-item"
                      >
                        Change Password
                      </Menu.Item>
                      <Menu.Item
                        value="new-win"
                        className="user-info-content-item"
                      >
                        Settings
                      </Menu.Item>

                      <Menu.Item
                        value="open-file"
                        className="user-info-content-item"
                      >
                        Help / Support
                      </Menu.Item>
                      <Menu.Item
                        value="export"
                        className="user-info-content-item"
                        onClick={() => logout()}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Icon>
                {isUserInfoOpen ? (
                  <RiArrowDropUpLine className="dropdown-icon" />
                ) : (
                  <RiArrowDropDownLine className="dropdown-icon" />
                )}
              </Icon>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
