import { Flex, IconButton, Table } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { Button } from "../components/ui/button";
import { FaEye } from "react-icons/fa";
import { GiVacuumCleaner } from "react-icons/gi";
import TableStatistics from "./TableStatistics";
import RoomDeleteDialog from "./RoomDeleteDialog";
import RoomEditDialog from "./RoomEditDialog";
import RoomViewDialog from "./RoomViewDialog";
import RoomCleaningTaskDialog from "./RoomCleaningTaskDialog";
import RecordEditDialog from "./RecordEditDialog";

export interface Room {
  id?: string;
  room_number: string;
  room_type: string;
  room_category?: string;
  room_view?: string;
  floor?: string;
  bed_type?: string;
  max_occupancy?: number;
  is_available?: boolean;
  is_cleaned?: boolean;
  is_occupied?: boolean;
  room_maintenance_status?: string;
  room_booking_status?: string;
  amenities?: string[];
  current_guest?: string;
  current_price?: number;
  date_created?: string;
  created_by?: string;
}

interface Props {
  data: Room[];
  heading: string;
}

const RoomList = ({ data, heading }: Props) => {
  const roomCleaningDialogTrigger = (
    <Tooltip content="Create cleaning task">
      <Button
        size="xs"
        _hover={{
          transform: "scale(1.2) translateY(-2px)",
          transition: "transform 0.3s ease-out",
          bg: "#DDDCDD",
          border: "1px solid #473647",
        }}
      >
        <GiVacuumCleaner />
      </Button>
    </Tooltip>
  );
  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Room Number
            </Table.ColumnHeader>
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
              Floor
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Maintenance
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Booking{" "}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((room) => (
            <Table.Row key={room.id} bg="white">
              <Table.Cell className="table-row-cell">
                {room.room_number}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {room.room_type}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {room.room_category || "N/A"}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {room.floor}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {room.room_maintenance_status}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {room.room_booking_status}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                <Flex justifyContent={"center"} w={"100%"}>
                  <RoomViewDialog room={room} />
                  <RoomEditDialog room={room} />
                  <RoomDeleteDialog room={room} />
                  <RoomCleaningTaskDialog
                    room={room}
                    dialogTrigger={roomCleaningDialogTrigger}
                  />
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

export default RoomList;
