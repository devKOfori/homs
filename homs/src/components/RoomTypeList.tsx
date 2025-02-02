import { Flex, Table, IconButton } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import TableStatistics from "./TableStatistics";
import RoomTypeViewDialog from "./RoomTypeViewDialog";
import { Category } from "./RoomCategoriesList";
import RoomTypeEditDialog from "./RoomTypeEditDialog";
import RoomTypeDeleteDialog from "./RoomTypeDeleteDialog";

export interface RoomType {
  id: string;
  name: string;
  amenities: string[] | null;
  bed_types: string[] | null;
  view: string | null;
  area_in_meters: number;
  area_in_feet: number;
  max_guests: number;
  rate: number;
  room_category: string | null;
}

interface Props {
  data: RoomType[];
  heading: string;
}

const RoomTypeList = ({ data, heading }: Props) => {
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
          {data.map((roomType) => (
            <Table.Row key={roomType.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {roomType.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                {roomType.rate}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"flex-end"} w={"100%"}>
                  <RoomTypeViewDialog roomType={roomType} />
                  <RoomTypeEditDialog roomType={roomType} />
                  <RoomTypeDeleteDialog roomType={roomType} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <TableStatistics heading={heading} data={data} />
    </>
  );
};

export default RoomTypeList;
