import { Table, Flex } from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import FloorEditDialog from "./FloorEditDialog";
import FloorViewDialog from "./FloorViewDialog";
import FloorDeleteDialog from "./FloorDeleteDialog";

interface HotelFloor {
  id: string;
  name: string;
}

interface Props {
  data: HotelFloor[];
  heading: string;
}

const FloorList = ({ data, heading }: Props) => {
  console.log(data);
  return (
    <>
      <Table.Root my={"3.5rem"} size="sm" interactive>
        <Table.Header className="table-header">
          <Table.Row>
            <Table.ColumnHeader
              
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Floor
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
            data.map((hotelFloor: HotelFloor) => (
              <Table.Row key={hotelFloor.id} bg="white">
                <Table.Cell className="table-row-cell">
                  {hotelFloor.name}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  <Flex justifyContent={"end"} w={"100%"}>
                    <FloorViewDialog hotelFloor={hotelFloor} />
                    <FloorEditDialog hotelFloor={hotelFloor} />
                    <FloorDeleteDialog hotelFloor={hotelFloor} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
        {/* <TableStatistics data={data} heading={heading} /> */}
      </Table.Root>
    </>
  );
};

export default FloorList;
