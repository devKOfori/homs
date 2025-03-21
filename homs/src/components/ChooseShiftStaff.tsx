import { DialogTitle, Heading, HStack, List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import ShiftStaffListItem, { Shift } from "./ShiftStaffListItem";
import { Staff } from "./StaffList";
import ShiftStaffList from "./ShiftStaffList";
import dayjs from "dayjs";
import hotelService from "../services/hotel-service";

interface Props {
  department: string;
  shiftDate: Date;
  shift: Shift;
}

export type ShiftStaff = {
  id: string;
  profile: string;
  shift: string;
  employee_name: string;
};

const ChooseShiftStaff = ({ shiftDate, shift }: Props) => {
  const [selectedStaff, setSelectedStaff] = useState<ShiftStaff[]>([]);
  const [open, setOpen] = useState(false);
  const { myDepartmentStaffList } = useAuth();

  useEffect(() => {
    const { request, cancel } = hotelService.getShiftStaff(
      shiftDate.toISOString().split("T")[0],
      shift.name
    );
    request.then((res) => {
      console.log(res.data);
      const staffForThisShift = res.data.filter(
        (staff: ShiftStaff) => staff.shift === shift.id
      );
      console.log(staffForThisShift);
      setSelectedStaff(staffForThisShift);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [shiftDate, shift]);

  const pastDate = dayjs(shiftDate).isBefore(dayjs(), "day");

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
            disabled={pastDate}
          >
            Add Staff
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" p="20px 40px">
          <DialogHeader borderBottom="1px solid #DDDCDD" pb="15px">
            <DialogTitle>
              <HStack>
                <Heading>Select Shift Staff</Heading>
                <Heading color="var(--header-bg)">
                  [{`${shiftDate.toDateString()} - ${shift.name}`}]
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
                      shift={shift}
                      shiftDate={shiftDate}
                    />
                  </>
                );
              })}
            </List.Root>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      {/* {selectedStaff.length > 0 && (
        <Button
          size="xs"
          color="red.500"
          variant="plain"
          px="10px"
          py="5px"
          onClick={() => {
            const request = hotelService.clearShiftStaff(
              shiftDate.toISOString().split("T")[0],
              shift.id
            );
            request.then((_) => {
              setSelectedStaff([]);
            });
            request.catch((err) => {
              console.log(err);
            });
          }}
        >
          Clear List
        </Button>
      )} */}
    </>
  );
};

export default ChooseShiftStaff;
