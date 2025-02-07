import { Table } from "@chakra-ui/react";
import ChooseShiftStaff from "./ChooseShiftStaff";
import { useHotelSetup } from "../contexts/HotelSetupProvider";
import { Shift } from "./ShiftStaffListItem";
import dayjs from "dayjs";

interface Props {
  shiftDate: Date;
  department: string;
}

const ShiftWorkingDay = ({ shiftDate, department }: Props) => {
  // const { shifts, setShifts } = useHotelSetup();

  console.log(JSON.parse(localStorage.getItem("shifts") ?? "[]"));
  const shifts = JSON.parse(localStorage.getItem("shifts") ?? "[]");
  const morningShift = shifts.find(
    (shift: Shift) => shift.name === "Morning Shift"
  );
  const afternoonShift = shifts.find(
    (shift: Shift) => shift.name === "Afternoon Shift"
  );
  const nightShift = shifts.find(
    (shift: Shift) => shift.name === "Night Shift"
  );
  console.log(morningShift);
  return (
    <Table.Row bg="white">
      <Table.Cell px="30px" py="5px">
        {shiftDate.toDateString()}
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff
          department={department}
          shiftDate={shiftDate}
          shift={morningShift}
        />
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff
          department={department}
          shiftDate={shiftDate}
          shift={afternoonShift}
        />
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff
          department={department}
          shiftDate={shiftDate}
          shift={nightShift}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default ShiftWorkingDay;
