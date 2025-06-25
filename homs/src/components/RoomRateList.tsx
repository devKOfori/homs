import React from "react";
import { Table } from "@chakra-ui/react";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import dayjs from "dayjs";

export interface RoomRate {
  id?: string;
  roomType: string;
  roomCategory?: string;
  startDate: string;
  endDate: string;
  price: number;
  discount?: number;
}

const RoomRateList = () => {
  const { roomRates } = useRoomSetup();
  console.log("Room Rates:", roomRates);
  return (
    <Table.Root mt="50px" mb="20px" size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            Room Type
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            Room Category
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            Start Date
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            End Date
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            Price
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          >
            Discount
          </Table.ColumnHeader>
          <Table.ColumnHeader
            bg={"var(--hairline-background-faint)"}
            className="table-column-header"
          ></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {roomRates.map((rate: any) => (
          <Table.Row key={rate.id} bg="white">
            <Table.Cell className="table-row-cell">{rate.room_type}</Table.Cell>
            <Table.Cell className="table-row-cell">
              {rate.room_category || "N/A"}
            </Table.Cell>
            <Table.Cell className="table-row-cell">
              {dayjs(rate.start_date).toISOString().split("T")[0]}
            </Table.Cell>
            <Table.Cell className="table-row-cell">
              {dayjs(rate.end_date).toISOString().split("T")[0]}
            </Table.Cell>
            <Table.Cell className="table-row-cell">${rate.price}</Table.Cell>
            <Table.Cell>
              {rate.discount ? `${rate.discount}%` : "N/A"}
            </Table.Cell>
            <Table.Cell className="table-row-cell">
              {/* Action buttons can be added here */}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default RoomRateList;
