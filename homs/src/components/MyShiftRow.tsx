import React from "react";
import { Heading, HStack, Table, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { AssignedShift } from "../pages/MyShifts";
import { Button } from "./ui/button";
import ShiftNoteDialog from "./ShiftNoteDialog";
import { Link } from "react-router-dom";

interface Props {
  shift: AssignedShift;
  updateShiftStatus: (id: string, newStatus: string) => void;
}

const MyShiftRow = ({ shift, updateShiftStatus }: Props) => {
  //   const updateShiftStatus = (id: string, newStatus: string) => {
  //     setError("");
  //     const request = hotelService.updateAssignedShiftStatus(id, newStatus);
  //     request.then((_) => {
  //       setShifts((prev) =>
  //         prev.map((shift) =>
  //           shift.id === id ? { ...shift, status: newStatus } : shift
  //         )
  //       );
  //       setEditStatusId(null);
  //     });
  //     request.catch((err) => {
  //       setError(err.message);
  //       console.log(err);
  //     });
  //   };
  return (
    <Table.Row bg="white" key={shift.id}>
      <Table.Cell className="table-row-cell">
        {dayjs(shift.date).format("ddd, MMMM DD YYYY")}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        {shift.shift}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        {shift.status}
      </Table.Cell>
      <Table.Cell className="table-row-cell">
        <HStack>
          <Button
            variant="plain"
            fontSize="10px"
            color="var(--header-bg)"
            px="2.5px"
            py="2px"
            _hover={{
              border: "1px solid black",
              bg: "var(--header-bg)",
              color: "white",
            }}
            disabled={
              (shift.shift_end_time &&
                dayjs(shift.shift_end_time).isBefore(dayjs())) ||
              !dayjs(shift.date).isSame(dayjs(), "day") ||
              shift.status === "Ended" ||
              shift.status === "Started"
            }
            onClick={() => updateShiftStatus(shift.id, "Started")}
          >
            {/* <FaPlay /> */}
            Start Shift
          </Button>
          <Button
            variant="plain"
            fontSize="10px"
            color="red.500"
            px="2.5px"
            py="2px"
            _hover={{
              border: "1px solid black",
              bg: "red.500",
              color: "white",
            }}
            disabled={
              (shift.shift_end_time &&
                dayjs(shift.shift_end_time).isBefore(dayjs())) ||
              !dayjs(shift.date).isSame(dayjs(), "day") ||
              shift.status === "Ended"
            }
            onClick={() => updateShiftStatus(shift.id, "Ended")}
          >
            {/* <FaStop size='xz' /> */}
            End Shift
          </Button>
          <ShiftNoteDialog assignedShift={shift} />
          <Button
            variant="plain"
            fontSize="10px"
            color="var(--header-bg)"
            px="2.5px"
            py="2px"
            _hover={{
              border: "1px solid black",
              bg: "var(--header-bg)",
              color: "white",
            }}
          >
            <Link to={`/dashboard/shift-details/${shift.id}`}>
              View Shift Details
            </Link>
          </Button>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};

export default MyShiftRow;
