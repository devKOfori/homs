import { Badge, Button, HStack, List, Text } from "@chakra-ui/react";
import React from "react";
import { AssignedShift } from "../pages/MyShifts";
import hotelService from "../services/hotel-service";
import { Room } from "./RoomList";

interface Props {
  room: Room;
  duty: AssignedShift;
  staffMembersWithCleaningTask: string[];
  assignmentDate: string;
  priority: string;
  description: string;
}

const CleaningTaskEmployeeListItem = ({
  room,
  duty,
  staffMembersWithCleaningTask,
  assignmentDate,
  priority,
  description,
}: Props) => {
  const [employeeAdded, setEmployeeAdded] = React.useState(
    staffMembersWithCleaningTask.includes(duty.profile)
  );
  const handleAssignTask = () => {
    const request = hotelService.createRoomCleaningTask(
      room.room_number,
      duty.shift_name,
      assignmentDate,
      duty.profile,
      priority,
      description
    );
    request.then((res) => {
      setEmployeeAdded(true);
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
  };
  return (
    <List.Item key={duty.profile}>
      <HStack>
        <Text>{duty.employee_name}</Text>
        <Text>{duty.shift_name}</Text>
        {employeeAdded && (
          <Badge
            fontSize="8px"
            size="xs"
            bg="green.700"
            px="7px"
            colorPalette="green"
            shadow="sm"
          >
            Assigned to Task
          </Badge>
        )}
        <Button
          size="xs"
          variant="plain"
          color="var(--header-bg)"
          onClick={handleAssignTask}
        >
          {employeeAdded ? "Remove from Task" : "Assign to Task"}
        </Button>
      </HStack>
    </List.Item>
  );
};

export default CleaningTaskEmployeeListItem;
