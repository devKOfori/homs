import { Badge, HStack, List, Text } from "@chakra-ui/react";
import { Staff } from "./StaffList";
import { Button } from "./ui/button";

interface Props {
  staff: Staff;
  selectedStaff: Staff[];
  setSelectedStaff: (staff: Staff[]) => void;
}

const ShiftStaffListItem = ({
  staff,
  selectedStaff,
  setSelectedStaff,
}: Props) => {
  const handleAddStaffToShift = () => {
    selectedStaff.includes(staff)
      ? setSelectedStaff(selectedStaff.filter((stf) => stf.id !== staff.id))
      : setSelectedStaff([...selectedStaff, staff]);
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
        {selectedStaff.includes(staff) ? (
          <Badge
            fontSize="8px"
            size="xs"
            bg="green.700"
            px="7px"
            colorPalette="green"
            shadow='sm'
          >
            Added to Shift
          </Badge>
        ) : (
          <Badge></Badge>
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
          Add to Shift
        </Button>
      </HStack>
    </List.Item>
  );
};

export default ShiftStaffListItem;
