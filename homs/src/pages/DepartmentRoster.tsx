import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Heading, HStack, Table } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import { AssignedShift } from "./MyShifts";
import hotelService from "../services/hotel-service";
import dayjs from "dayjs";

const DepartmentRoster = () => {
  const [assignedShifts, setAssignedShifts] = useState<AssignedShift[]>([]);
  const {
    auth: { department },
  } = useAuth();
  useEffect(() => {
    const { request, cancel } = hotelService.getDepartmentShifts(
      department ?? ""
    );
    request.then((res) => {
      console.log(res.data);
      setAssignedShifts(res.data);
    });
    request.catch((err) => {
      console.log(err.message);
    });
    return () => cancel();
  }, []);
  return (
    <>
      <HStack>
        <Heading fontWeight={300}>Department Rollster</Heading>
        <Heading as="h3" size="md" color="var(--header-bg)">
          [{department}]
        </Heading>
      </HStack>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Date
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Shift
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Staff
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
          {assignedShifts.map((shift) => (
            <Table.Row bg="white" key={shift.id}>
              <Table.Cell className="table-row-cell">
                {dayjs(shift.date).format("ddd, MMMM DD YYYY")}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {shift.shift_name}
              </Table.Cell>
              <Table.Cell className="table-row-cell">
                {shift.employee_name}
              </Table.Cell>
              <Table.Cell className="table-row-cell">{shift.status}</Table.Cell>
              <Table.Cell className="table-row-cell"></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default DepartmentRoster;
