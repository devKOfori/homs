import { useState } from "react";
import { Table, Flex, IconButton } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import TableStatistics from "./TableStatistics";
import FloorEditDialog from "./FloorEditDialog";

interface HostelFloor {
  id: string;
  name: string;
}

interface Props {
  data: HostelFloor[];
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
          {data.map((hostelFloor: HostelFloor) => (
            <Table.Row key={hostelFloor.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {hostelFloor.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                <Flex justifyContent={"end"} w={"100%"}>
                  <Tooltip content={`View Room`}>
                    <Button
                      mx="1px"
                      size={"xs"}
                      onClick={() => console.log("icon clicked")}
                      _hover={{
                        transform: "scale(1.1)",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <FaEye />
                    </Button>
                  </Tooltip>
                  <FloorEditDialog hotelFloor={hostelFloor} />
                  <Tooltip content="Edit Category">
                    <IconButton
                      size={"xs"}
                      _hover={{
                        transform: "scale(1.05)",
                        transition: "transform 0.3s ease-out",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="Delete Category">
                    <IconButton
                      size={"xs"}
                      _hover={{
                        transform: "scale(1.1)",
                        border: "1px solid var(--darkened-bg-2)",
                        bg: "var(--darkened-bg)",
                      }}
                    >
                      <BiTrash />
                    </IconButton>
                  </Tooltip>
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
