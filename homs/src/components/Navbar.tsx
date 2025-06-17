import { Box, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import "./Navbar.css";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const {
    auth: { username, accessToken, refreshToken },
  } = useAuth();
  console.log(refreshToken);
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
  return (
    <Box h="100%" className="navbar">
      <Flex
        justify={"space-between"}
        align="center"
        h="100%"
        px="50px"
        wrap="wrap"
      >
        <Box className="search" fontWeight={300}>
          HOMS
        </Box>
        <Flex
          align="center"
          wrap={"wrap"}
          gap="10px"
          fontWeight={300}
          fontSize="0.8875rem"
        >
          <Text color="var(--accent)">
            Welcome, <strong>@{`${username}`}</strong>
          </Text>
          <Text>View Profile</Text>
          <Text>Change Password</Text>
          <Text
            onClick={logout}
            _hover={{
              cursor: "pointer",
            }}
          >
            Logout
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
