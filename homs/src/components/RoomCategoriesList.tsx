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
  id: string;
  name: string;
  amenities: string[] | null;
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
              bg="var(--darkened-bg-2)"
              color="black"
              p="10px"
            >
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              p="10px"
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
