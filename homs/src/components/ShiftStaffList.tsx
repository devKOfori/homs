import { Staff } from "./StaffList";
import { HStack, IconButton, List, Text } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { Tooltip } from "./ui/tooltip";

interface Props {
  selectedStaff: Staff[];
  setSelectedStaff: (staff: Staff[]) => void;
}

const ShiftStaffList = ({ selectedStaff, setSelectedStaff }: Props) => {
  return (
    <>
      {selectedStaff.length > 0 && (
        <List.Root variant="plain">
          {selectedStaff.map((staff, index) => (
            <List.Item key={index}>
              <HStack>
                <Text>{staff.full_name}</Text>
                <Tooltip content="Remove from shift">
                  <IconButton
                    size="xs"
                    color="red.500"
                    onClick={() =>
                      setSelectedStaff(
                        selectedStaff.filter((stf) => stf.id !== staff.id)
                      )
                    }
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
