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
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Floor
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
          {data.map((hotelFloor: HotelFloor) => (
            <Table.Row key={hotelFloor.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {hotelFloor.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"end"} w={"100%"}>
                  <FloorViewDialog hotelFloor={hotelFloor} />
                  <FloorEditDialog hotelFloor={hotelFloor} />
                  <FloorDeleteDialog hotelFloor={hotelFloor} />
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

export default FloorList;
