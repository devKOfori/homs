import { Table, Flex } from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import BedTypeViewDialog from "./BedTypeViewDialog";
import BedTypeEditDialog from "./BedTypeEditDialog";
import BedTypeDeleteDialog from "./BedTypeDeleteDialog";

export interface BedType {
  id: string;
  name: string;
}

interface Props {
  data: BedType[];
  heading: string;
}

const BedTypeList = ({ data, heading }: Props) => {
  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Bed Type
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((bedType: BedType) => (
            <Table.Row key={bedType.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {bedType.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"end"} w={"100%"}>
                  <BedTypeViewDialog bedType={bedType} />
                  <BedTypeEditDialog bedType={bedType} />
                  <BedTypeDeleteDialog bedType={bedType} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <TableStatistics data={data} heading={heading} />
    </>
  );
};

export default BedTypeList;
