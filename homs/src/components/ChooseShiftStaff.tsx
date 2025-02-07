import { DialogTitle, Heading, HStack, List } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { useAuth } from "../contexts/AuthProvider";
import ShiftStaffListItem from "./ShiftStaffListItem";
import { Staff } from "./StaffList";
import ShiftStaffList from "./ShiftStaffList";

interface Props {
  department: string;
  date: Date;
  shift: string;
}

const ChooseShiftStaff = ({ date, shift }: Props) => {
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);
  const [open, setOpen] = useState(false);
  const { myDepartmentStaffList } = useAuth();
  return (
    <>
      <ShiftStaffList
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
      />
      <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>
          <Button
            size="xs"
            color="var(--header-bg)"
            variant="plain"
            px="10px"
            py="5px"
          >
            Choose Staff
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" p="20px 40px">
          <DialogHeader borderBottom="1px solid #DDDCDD" pb="15px">
            <DialogTitle>
              <HStack>
                <Heading>Select Shift Staff</Heading>
                <Heading color="var(--header-bg)">
                  [{`${date.toDateString()} - ${shift}`}]
                </Heading>
              </HStack>
            </DialogTitle>
            <DialogCloseTrigger
              color="red.500"
              _hover={{
                bg: "transparent",
                color: "red.500",
                fontWeight: "bold",
                transform: "scale(1.05) translateY(-2px)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </DialogHeader>
          <DialogBody py="20px">
            <List.Root variant="plain">
              {myDepartmentStaffList.map((staff) => {
                return (
                  <>
                    <ShiftStaffListItem
                      staff={staff}
                      selectedStaff={selectedStaff}
                      setSelectedStaff={setSelectedStaff}
                    />
                  </>
                );
              })}
            </List.Root>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      {selectedStaff.length > 0 && (
        <Button
          size="xs"
          color="red.500"
          variant="plain"
          px="10px"
          py="5px"
          onClick={() => setSelectedStaff([])}
        >
          Clear List
        </Button>
      )}
    </>
  );
};

export default ChooseShiftStaff;
