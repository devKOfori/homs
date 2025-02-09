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
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Amenity
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
          {data.map((amenity: Amenity) => (
            <Table.Row key={amenity.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {amenity.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"end"} w={"100%"}>
                  <AmenityViewDialog amenity={amenity} />
                  <AmenityEditDialog amenity={amenity} />
                  <AmenityDeleteDialog amenity={amenity} />
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

export default AmenityList;
