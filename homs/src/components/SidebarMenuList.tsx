import { List, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  data: { item: string; url: string }[];
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
}

const SidebarMenuList = ({ data, selectedMenu, setSelectedMenu }: Props) => {
  return (
    <List.Root variant="plain">
      {data.map((menuItem, index) => (
        <Link key={menuItem.url} to={`/dashboard/${menuItem.url}`}>
          <List.Item
            py="5px"
            bg={index % 2 === 0 ? "var(--darkened-bg)" : "white"}
            display="block"
            borderBottom="1px solid var(--hairline-color)"
          >
            <Text
              pl="16px"
              fontWeight={500}
              fontSize="14px"
              color="var(--header-bg)"
            >
              {menuItem.item}
            </Text>
          </List.Item>
        </Link>
      ))}
    </List.Root>
  );
};

export default SidebarMenuList;
