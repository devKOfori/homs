import { useEffect, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { GiVacuumCleaner } from "react-icons/gi";
import { Tooltip } from "./ui/tooltip";
import { DialogHeader, HStack, Input, List, Text } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import { AssignedShift } from "../pages/MyShifts";
import hotelService from "../services/hotel-service";
import { useHotelSetup } from "../contexts/HotelSetupProvider";
import { Shift } from "./ShiftStaffListItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import CleaningTaskEmployeeListItem from "./CleaningTaskEmployeeListItem";
import { Room } from "./RoomList";

interface Props {
  room: Room;
}

const RoomCleaningTaskDialog = ({ room }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<RoomCleaningTaskFormValues>({
    roomNumber: room.room_number,
    date: dayjs().toISOString().split("T")[0],
    shift: "",
    priority: "",
    taskDescription: "",
    staffProfile: "",
  });
  const [dutyList, setDutyList] = useState<AssignedShift[]>([]);
  const [staffMembersWithCleaningTask, setStaffMembersWithCleaningTask] =
    useState<string[]>([]);

  const shifts = JSON.parse(localStorage.getItem("shifts") || "[]");
  const priorities = JSON.parse(localStorage.getItem("priorities") || "[]");
  // console.log(shifts);
  const schema = z.object({
    roomNumber: z.string().nonempty({ message: "Room Number is required" }),
    date: z.string(),
    shift: z.string(),
    priority: z.string(),
    taskDescription: z.string(),
    staffProfile: z.string(),
  });
  type RoomCleaningTaskFormValues = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RoomCleaningTaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomNumber: formData.roomNumber,
      date: formData.date,
      shift: formData.shift,
    },
  });

  console.log(formData);

  useEffect(() => {
    const { request, cancel } = hotelService.getShiftStaff(
      dayjs(formData.date)
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .toISOString()
        .split("T")[0],
      formData.shift,
      true
    );
    request.then((res) => {
      setDutyList(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [formData.date, formData.shift]);

  useEffect(() => {
    const { request, cancel } = hotelService.getHouseKeepingTaskStaffList(
      dayjs(formData.date).toISOString().split("T")[0],
      formData.shift,
      room.room_number
    );
    request.then((res) => {
      setStaffMembersWithCleaningTask(res.data);
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [formData.date, formData.shift, room.room_number]);
  const onSubmit = (data: RoomCleaningTaskFormValues) => {
    console.log(data);
    const request = hotelService.createRoomCleaningTask(
        data.roomNumber,
        data.shift,
        data.date,
        data.staffProfile,
        data.priority,
        data.taskDescription
    );
    request.then((res) => {
      console.log(res.data);
      setOpen(false);
    });
    request.catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>
          <Tooltip content="Create cleaning task">
            <Button
              size="xs"
              _hover={{
                transform: "scale(1.2) translateY(-2px)",
                transition: "transform 0.3s ease-out",
                bg: "#DDDCDD",
                border: "1px solid #473647",
              }}
            >
              <GiVacuumCleaner />
            </Button>
          </Tooltip>
        </DialogTrigger>
        <DialogContent bg="white" p="20px 40px">
          <DialogHeader borderBottom="1px solid #DDDCDD" pb="15px">
            <DialogTitle>Room Cleaning Task</DialogTitle>
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
          <DialogBody>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <Field label="Room Number" mb="20px" required>
                <Input
                  type="text"
                  px="10px"
                  disabled
                  {...register("roomNumber")}
                />
              </Field>
              <HStack>
                <Field label="Date" mb="20px" required>
                  <Input
                    type="date"
                    px="10px"
                    {...register("date")}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </Field>
                <Field label="Shift" mb="20px">
                  <NativeSelectRoot>
                    <NativeSelectField
                      px="10px"
                      {...register("shift")}
                      onChange={(e) =>
                        setFormData({ ...formData, shift: e.target.value })
                      }
                    >
                      <option value="">Select Shift</option>
                      {shifts.map((shift: Shift) => (
                        <option key={shift.id} value={shift.name}>
                          {shift.name}
                        </option>
                      ))}
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
              </HStack>
              <Field label="Staff" mb="20px" required>
                <NativeSelectRoot>
                  <NativeSelectField px="10px" {...register("staffProfile")}>
                    <option value="">Select Staff</option>
                    {dutyList.map((duty) => (
                      <option key={duty.profile} value={duty.profile}>
                        {duty.employee_name}
                      </option>
                    ))}
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
              <Field label="Priority" mb="20px">
                <NativeSelectRoot>
                  <NativeSelectField px="10px" {...register("priority")}>
                    <option value="">Select Priority</option>
                    {priorities.map(
                      (priority: { id: string; name: string }) => (
                        <option key={priority.id} value={priority.name}>
                          {priority.name}
                        </option>
                      )
                    )}
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>

              <Field label="Task Description" mb="20px">
                <Input type="text" px="10px" {...register("taskDescription")} />
              </Field>
              <Button
                type="submit"
                bg="var(--header-bg)"
                color="white"
                p="10px 20px"
              >
                Save
              </Button>
            </form>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default RoomCleaningTaskDialog;
