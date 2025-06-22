import { useState } from "react";
import {
  Table,
  Flex,
} from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import RoomCategoryEditDialog from "./RoomCategoryEditDialog";
import RoomCategoryViewDialog from "./RoomCategoryViewDialog";
import RoomCategoryDeleteDialog from "./RoomCategoryDeleteDialog";

export interface Category {
  id?: string;
  name: string;
  room_area?: number;
  description?: string;
  created_by?: string;
  date_created?: string;
}

interface Props {
  data: Category[];
  heading: string;
}

const RoomCategoriesList = ({ data, heading }: Props) => {
  const [selection, setSelection] = useState<string[]>([]);




  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((category) => (
            <Table.Row key={category.id} bg="white">
              <Table.Cell className="table-row-cell">
                {category.name}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {/* <RoomCategoryEditDialog roomCategory={category}  /> */}
                <Flex justifyContent={"flex-end"} w={"100%"}>
                  <RoomCategoryViewDialog roomCategory={category} />
                  <RoomCategoryEditDialog roomCategory={category} />
                  <RoomCategoryDeleteDialog roomCategory={category} />
                </Flex>
                {/* <ActionIcons roomtype={category} /> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <TableStatistics heading={heading} data={data} />
    </>
  );
};

export default RoomCategoriesList;
