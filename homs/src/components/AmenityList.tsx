import React from "react";
import { Table, Flex } from "@chakra-ui/react";
import TableStatistics from "./TableStatistics";
import AmenityDeleteDialog from "./AmenityDeleteDialog";
import AmenityEditDialog from "./AmenityEditDialog";
import AmenityViewDialog from "./AmenityViewDialog";

export interface Amenity {
  id: string;
  name: string;
}

interface Props {
  data: Amenity[];
  heading: string;
}

const AmenityList = ({ data, heading }: Props) => {
  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Amenity
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
            data.map((amenity: Amenity) => (
              <Table.Row key={amenity.id} bg="white">
                <Table.Cell className="table-row-cell">
                  {amenity.name}
                </Table.Cell>
                <Table.Cell className="table-row-cell">
                  <Flex justifyContent={"end"} w={"100%"}>
                    <AmenityViewDialog amenity={amenity} />
                    <AmenityEditDialog amenity={amenity} />
                    <AmenityDeleteDialog amenity={amenity} />
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

export default AmenityList;
