import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ActionPageHeader from "../components/ActionPageHeader";
import { Box, Flex, IconButton, Table } from "@chakra-ui/react";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { Button } from "../components/ui/button";
import { FaEye } from "react-icons/fa";
import { Tooltip } from "../components/ui/tooltip";

export interface View {
  id: string;
  name: string;
}

const Views = () => {
  const [views, setViews] = useState<View[]>([]);

  useEffect(() => {
    const { request, cancel } = roomService.getViews();
    request.then((response) => {
      setViews(response.data);
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      console.log(error.message);
    });
    return () => cancel();
  }, []);
  return (
    <DashboardLayout>
      <ActionPageHeader heading="Hotel View" />
      <Box>
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
            {views.map((view) => (
              <Table.Row key={view.id} bg="white">
                <Table.Cell px="30px" py="5px">
                  {view.name}
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
      </Box>
    </DashboardLayout>
  );
};

export default Views;
