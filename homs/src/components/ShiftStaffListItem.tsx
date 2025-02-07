import { Badge, HStack, List, Text } from "@chakra-ui/react";
import { Staff } from "./StaffList";
import { Button } from "./ui/button";
import hotelService from "../services/hotel-service";
import dayjs from "dayjs";
import { useState } from "react";
import { ShiftStaff } from "./ChooseShiftStaff";

export type Shift = {
  id: string;
  name: string;
  start_time: dayjs.Dayjs;
  end_time: dayjs.Dayjs;
};

interface Props {
  staff: Staff;
  selectedStaff: ShiftStaff[];
  setSelectedStaff: (
    staff: ShiftStaff[] | ((prev: ShiftStaff[]) => ShiftStaff[])
  ) => void;
  shift: Shift;
  shiftDate: Date;
}

const ShiftStaffListItem = ({
  staff,
  selectedStaff,
  setSelectedStaff,
  shift,
  shiftDate,
}: Props) => {
  const [isAdded, setIsAdded] = useState(
    selectedStaff.some((stf) => stf.profile === staff.id)
  );
  const [shiftAssignmentId, setShiftAssignmentId] = useState("");
  const handleAddStaffToShift = () => {
    if (shiftAssignmentId) {
      const request = hotelService.removeShiftAssignment(shiftAssignmentId);
      request.then((res) => {
        setIsAdded(false);
        setShiftAssignmentId("");
        setSelectedStaff(selectedStaff.filter((stf) => stf.id !== staff.id));
        console.log(res.data);
      });
      request.catch((err) => {
        console.log(err);
      });
      return;
    }

    const request = hotelService.assignShiftToEmployee(
      staff.id,
      shift.id,
      shiftDate.toISOString().split("T")[0]
    );
    request.then((res) => {
      setIsAdded(true); // used to track what button text to display
      setShiftAssignmentId(res.data.id); // used to remove shift assignment
      setSelectedStaff((prev: ShiftStaff[]) => [res.data, ...prev]);

      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
  };

  return (
    <List.Item
      key={staff.id}
      mb="10px"
      borderBottom="1px solid var(--hairline-color)"
      pb="5px"
    >
      <HStack gap="50px" py="5px">
        <Text>{staff.full_name}</Text>
        {isAdded && (
          <Badge
            fontSize="8px"
            size="xs"
            bg="green.700"
            px="7px"
            colorPalette="green"
            shadow="sm"
          >
            Added to Shift
          </Badge>
        )}

        <Button
          variant="outline"
          size="xs"
          fontSize="10px"
          bg="white"
          px="10px"
          color="var(--header-bg)"
          onClick={handleAddStaffToShift}
        >
          {isAdded ? "Remove from Shift" : "Add to Shift"}
        </Button>
      </HStack>
    </List.Item>
  );
};

export default ShiftStaffListItem;
