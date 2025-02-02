import { Table, Flex } from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import HotelViewViewDialog from "./HotelViewViewDialog";
import HotelViewEditDialog from "./HotelViewEditDialog";
import HotelViewDeleteDialog from "./HotelViewDeleteDialog";

export interface HotelView {
  id: string;
  name: string;
}

interface Props {
  data: HotelView[];
  heading: string;
}

const HotelViewList = ({ data, heading }: Props) => {
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
              View
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
          {data.map((hotelView: HotelView) => (
            <Table.Row key={hotelView.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {hotelView.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"end"} w={"100%"}>
                    <HotelViewViewDialog hotelView={hotelView} />
                    <HotelViewEditDialog hotelView={hotelView} />
                    <HotelViewDeleteDialog hotelView={hotelView} />
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

export default HotelViewList;
