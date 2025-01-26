import { Flex, Table, HStack, IconButton, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

export interface RoomType {
  id: string;
  name: string;
  amenities: string[] | null;
  bedTypes: string[] | null;
  view: string | null;
  areaInMeters: number;
  areaInFeet: number;
  maxGuests: number;
  rate: number;
}

interface Props {
  data: RoomType[];
  heading: string;
  setShowRoomTypeForm: (value: boolean) => void;
  isEditButtonClicked: boolean;
  setIsEditButtonClicked: (value: boolean) => void;
  setUpdatedRoomType: (roomType: RoomType | null) => void;
  roomType: RoomType | null;
  setRoomRoomTypes: (value: RoomType[]) => void;
}

const RoomTypeList = ({
  data,
  heading,
  setShowRoomTypeForm,
  setIsEditButtonClicked,
  setUpdatedRoomType,
  roomType,
  setRoomRoomTypes,
}: Props) => {
  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="10px"
            >
              Roomtype
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="10px"
            >
              Rate (GHC)
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="10px"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((category) => (
            <Table.Row key={category.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {category.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                {category.rate}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"flex-end"} w={"100%"}>
                  <Tooltip content={`View ${heading}`}>
                    <Button
                      size={"xs"}
                      onClick={() => console.log("icon clicked")}
                      _hover={{
                        transform: "scale(1.1)",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <FaEye />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Edit Category">
                    <IconButton
                      size={"xs"}
                      _hover={{
                        transform: "scale(1.05)",
                        transition: "transform 0.3s ease-out",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete Category">
                    <IconButton
                      size={"xs"}
                      _hover={{
                        transform: "scale(1.1)",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <BiTrash />
                    </IconButton>
                  </Tooltip>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <HStack>
        <Text>{data.length}</Text>
        <Text>{heading.endsWith("y") ? `${heading.slice(0, -1)}ies` : ""}</Text>
      </HStack>
    </>
  );
};

export default RoomTypeList;
