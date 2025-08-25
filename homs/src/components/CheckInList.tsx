import React from "react";
import { Box, Table, Text } from "@chakra-ui/react";
import { CheckInProps } from "../pages/CheckIn";
import { Button } from "./ui/button";

export interface CheckInListProps {
  checkIns: CheckInProps[];
}

const CheckInList = ({ checkIns }: CheckInListProps) => {
  return (
    <Box overflow="auto" mt={"20px"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Booking Code
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Guest Name
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Room
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Check-in Time
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Check-out
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Payment Type
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {checkIns !== undefined ? (
            checkIns.length > 0 ? (
              <Text>Rendering check-ins</Text>
            ) : (
              <Text>No check-ins available.</Text>
            )
          ) : (
            <Text>No check-ins available.</Text>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default CheckInList;
