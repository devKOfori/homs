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
  id?: string;
  name: string;
  max_occupancy: number;
  base_price: number;
  amenities?: string[] | null;
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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Roomtype
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Rate (GHC)
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={3} py="0.6rem" bg={"white"}>
                No {heading} found.
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((roomType) => (
              <Table.Row key={roomType.id} bg="white">
                <Table.Cell className="table-row-cell">
                  {roomType.name}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  {roomType.rate}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  <Flex justifyContent={"flex-end"} w={"100%"}>
                    <RoomTypeViewDialog roomType={roomType} />
                    <RoomTypeEditDialog roomType={roomType} />
                    <RoomTypeDeleteDialog roomType={roomType} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <TableStatistics heading={heading} data={data} />
    </>
  );
};

export default RoomTypeList;
