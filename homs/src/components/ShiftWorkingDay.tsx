import { Table } from "@chakra-ui/react";
import ChooseShiftStaff from "./ChooseShiftStaff";

interface Props {
  date: Date;
  department: string;
}

const ShiftWorkingDay = ({ date, department }: Props) => {
  return (
    <Table.Row bg="white">
      <Table.Cell px="30px" py="5px">
        {date.toDateString()}
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff department={department} date={date} shift="morning" />
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff
          department={department}
          date={date}
          shift="afternoon"
        />
      </Table.Cell>
      <Table.Cell px="30px" py="5px">
        <ChooseShiftStaff department={department} date={date} shift="night" />
      </Table.Cell>
    </Table.Row>
  );
};

export default ShiftWorkingDay;
