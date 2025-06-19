import { Table, Flex } from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import BedTypeViewDialog from "./BedTypeViewDialog";
import BedTypeEditDialog from "./BedTypeEditDialog";
import BedTypeDeleteDialog from "./BedTypeDeleteDialog";
import { BedType } from "../contexts/RoomSetupProvider";


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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Bed Type
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
              <Table.Cell colSpan={2} py="0.6rem" bg={"white"}>
                No {heading} found.
              </Table.Cell>
            </Table.Row>
          ) : (
            data.map((bedType: BedType) => (
              <Table.Row key={bedType.id} bg="white">
                <Table.Cell className="table-row-cell">
                  {bedType.name}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  <Flex justifyContent={"end"} w={"100%"}>
                    <BedTypeViewDialog bedType={bedType} />
                    <BedTypeEditDialog bedType={bedType} />
                    <BedTypeDeleteDialog bedType={bedType} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <TableStatistics data={data} heading={heading} />
    </>
  );
};

export default BedTypeList;
