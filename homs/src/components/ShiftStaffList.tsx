import { Staff } from "./StaffList";
import { HStack, IconButton, List, Text } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "./ui/tooltip";
import dayjs from "dayjs";
import hotelService from "../services/hotel-service";
import { ShiftStaff } from "./ChooseShiftStaff";

interface Props {
  selectedStaff: ShiftStaff[];
  setSelectedStaff: (staff: ShiftStaff[]) => void;
}

const ShiftStaffList = ({ selectedStaff, setSelectedStaff }: Props) => {
  return (
    <>
      {selectedStaff.length > 0 && (
        <List.Root variant="plain">
          {selectedStaff.map((staff, index) => (
            <List.Item key={index}>
              <HStack>
                <Text>{staff.employee_name}</Text>
                <Tooltip content="Remove from shift">
                  <IconButton
                    size="xs"
                    color="red.500"
                    onClick={() => {
                      const request = hotelService.removeShiftAssignment(
                        staff.id
                      );
                      request.then((_) => {
                        setSelectedStaff(
                          selectedStaff.filter((stf) => stf.id !== staff.id)
                        );
                      });
                    }}
                  >
                    <MdOutlineCancel />
                  </IconButton>
                </Tooltip>
              </HStack>
            </List.Item>
          ))}
        </List.Root>
      )}
    </>
  );
};

export default ShiftStaffList;
