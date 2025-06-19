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
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              View
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
            data.map((hotelView: HotelView) => (
              <Table.Row key={hotelView.id} bg="white">
                <Table.Cell className="table-row-cell">
                  {hotelView.name}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  <Flex justifyContent={"end"} w={"100%"}>
                    <HotelViewViewDialog hotelView={hotelView} />
                    <HotelViewEditDialog hotelView={hotelView} />
                    <HotelViewDeleteDialog hotelView={hotelView} />
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

export default HotelViewList;
