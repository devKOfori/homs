import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Heading, HStack, Table, Text } from "@chakra-ui/react";
import hotelService from "../services/hotel-service";
import { CanceledError } from "axios";
import ShiftNoteDialog from "../components/ShiftNoteDialog";
import { useAuth } from "../contexts/AuthProvider";
import dayjs from "dayjs";
import { Button } from "../components/ui/button";
import MyShiftRow from "../components/MyShiftRow";

export type AssignedShift = {
  id: string;
  shift: string;
  date: string;
  shift_start_time: string;
  shift_end_time: string;
  start_time: string;
  end_time: string;
  status: string;
  profile: string;
  employee_name: string;
  shift_name: string;
};

const MyShifts = () => {
  const [shifts, setShifts] = useState<AssignedShift[]>([]);
  const [error, setError] = useState("");
  const [editStatusId, setEditStatusId] = useState<string | null>(null);

  console.log(editStatusId);

  const { auth } = useAuth();

  useEffect(() => {
    const { request, cancel } = hotelService.getMyShifts();
    request.then((response) => {
      setShifts(response.data);
      console.log(response.data);
    });
    request.catch((error) => {
      if (error instanceof CanceledError) return;
      setError(error.message);
      console.log(error.message);
    });
    return () => cancel();
  }, []);

  const shiftStatuses = JSON.parse(
    localStorage.getItem("shiftStatuses") || "[]"
  );

  const updateShiftStatus = (id: string, newStatus: string) => {
    setError("");
    const request = hotelService.updateAssignedShiftStatus(id, newStatus);
    request.then((_) => {
      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === id ? { ...shift, status: newStatus } : shift
        )
      );
      setEditStatusId(null);
    });
    request.catch((err) => {
      setError(err.message);
      console.log(err);
    });
  };

  return (
    <DashboardLayout>
      <Heading fontWeight={300}>My Shifts</Heading>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        {error && <Text color="red.500">{error}</Text>}
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Date
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Shift
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Status
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
          {shifts.map((shift) => (
            <MyShiftRow shift={shift} updateShiftStatus={updateShiftStatus} />

            // <Table.Row bg="white" key={shift.id}>
            //   <Table.Cell px="30px" py="5px">
            //     {dayjs(shift.date).format("ddd, MMMM DD YYYY")}
            //   </Table.Cell>
            //   <Table.Cell px="30px" py="5px">
            //     {shift.shift}
            //   </Table.Cell>
            //   <Table.Cell px="30px" py="5px">
            //     {shift.status}
            //   </Table.Cell>
            //   <Table.Cell px="30px" py="5px">
            //     <HStack>
            //       <Button
            //         variant="plain"
            //         fontSize="10px"
            //         color="var(--header-bg)"
            //         px="2.5px"
            //         py="2px"
            //         _hover={{
            //           border: "1px solid black",
            //           bg: "var(--header-bg)",
            //           color: "white",
            //         }}
            //         disabled={
            //           (shift.shift_end_time &&
            //             dayjs(shift.shift_end_time).isBefore(dayjs())) ||
            //           dayjs(shift.date).isBefore(dayjs(), "day") ||
            //           shift.status === "Ended"
            //         }
            //         onClick={() => updateShiftStatus(shift.id, "Started")}
            //       >
            //         {/* <FaPlay /> */}
            //         Start Shift
            //       </Button>
            //       <Button
            //         variant="plain"
            //         fontSize="10px"
            //         color="red.500"
            //         px="2.5px"
            //         py="2px"
            //         _hover={{
            //           border: "1px solid black",
            //           bg: "red.500",
            //           color: "white",
            //         }}
            //         onClick={() => updateShiftStatus(shift.id, "Ended")}
            //       >
            //         {/* <FaStop size='xz' /> */}
            //         End Shift
            //       </Button>
            //       <ShiftNoteDialog assignedShift={shift} />
            //     </HStack>
            //   </Table.Cell>
            // </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </DashboardLayout>
  );
};

export default MyShifts;
