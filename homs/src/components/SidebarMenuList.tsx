import { List, Text, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  data: { item: string; url: string }[];
  // selectedMenuIndex: number;
  // setSelectedMenuIndex: (index: number) => void;
}

const SidebarMenuList = ({ data}: Props) => {
  const location = useLocation();
  return (
    <Box>
      <List.Root variant="plain">
        {data.map((menuItem, index) => {
          const fullPath = `/dashboard/${menuItem.url}`;
          const isActive = location.pathname === fullPath;
          return (
            <Link key={menuItem.url} to={`/dashboard/${menuItem.url}`}>
              <List.Item
                py="0.7rem"
                display="block"
                color={
                  isActive
                    ? "var(--logo-color)"
                    : "var(--text-color)"
                }
                bg={
                  isActive
                    ? "var(--hairline-background-faint)"
                    : "var(--normal-bg)"
                }
                borderLeft={
                  isActive
                    ? "3px solid var(--logo-color)"
                    : "none"
                }
                _hover={{
                  bg: "var(--hairline-background-faint)",
                  borderLeft: "3px solid var(--logo-color)",
                }}
                // onClick={() => setSelectedMenuIndex(index)}
              >
                <Text
                  // pl="16px"
                  fontWeight={500}
                  fontSize="0.9rem"
                  px="0.5rem"
                >
                  {menuItem.item}
                </Text>
              </List.Item>
            </Link>
          );
  })}
      </List.Root>
    </Box>
  );
};

export default SidebarMenuList;
