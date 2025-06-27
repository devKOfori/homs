import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Box,
  Button,
  DataList,
  Heading,
  HStack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import hotelService from "../services/hotel-service";
import { AssignedShift } from "./MyShifts";
import dayjs from "dayjs";
import HouseKeepingTasksList from "../components/HouseKeepingTasksList";

const ShiftDetails = () => {
  const [shift, setShift] = useState<AssignedShift | null>(null);
  const [shiftNote, setShiftNote] = useState<{ id: string; note: string }>({
    id: "",
    note: "",
  });
  const { shiftId } = useParams<{ shiftId: string }>();

  useEffect(() => {
    const { request, cancel } = hotelService.getShiftDetails(shiftId ?? "");
    request.then((res) => {
      setShift(res.data);
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [shiftId]);
  useEffect(() => {
    const { request, cancel } = hotelService.getShiftNote(shiftId ?? "");
    request.then((res) => {
      setShiftNote({ id: res.data[0].id, note: res.data[0].note });
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [shiftId]);

  const handleUpdateShiftNote = () => {
    let request;
    const shiftNoteData = {
      id: shiftNote.id,
      note_date: dayjs().toISOString().split("T")[0],
      note: shiftNote.note,
      assigned_shift: shiftId ?? "",
    };
    if (shiftNote.id) {
      console.log(shiftNote);
      request = hotelService.updateShiftNote(shiftNote.id, shiftNoteData);
    } else {
      request = hotelService.addShiftNote(shiftNoteData);
    }
    request.then((res) => {
      setShiftNote({ id: res.data.id, note: res.data.note });
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Heading fontWeight={300}>
        <HStack borderBottom={"1px solid #DDDCDD"} pb="15px">
          <Text>Shift</Text>
          <Text color="var(--header-bg)">{shiftId}</Text>
        </HStack>
      </Heading>
      <DataList.Root
        orientation="horizontal"
        mt="15px"
        borderBottom={"1px solid #DDDCDD"}
        pb="15px"
      >
        <DataList.Item>
          <DataList.ItemLabel>Date:</DataList.ItemLabel>
          <DataList.ItemValue>
            {dayjs(shift?.date).format("ddd, MMMM DD YYYY")}
          </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Time:</DataList.ItemLabel>
          <DataList.ItemValue>
            {`${dayjs(shift?.shift_start_time).format("hh:mm A")} - ${dayjs(
              shift?.shift_end_time
            ).format("hh:mm A")}`}
          </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Status:</DataList.ItemLabel>
          <DataList.ItemValue>{shift?.status}</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
      <Box mt="15px" borderBottom={"1px solid #DDDCDD"} pb="15px">
        <Heading fontWeight={300} mt="10px">
          Shift Notes
        </Heading>
        <Textarea
          mt="10px"
          value={shiftNote.note}
          p="5px"
          onChange={(e) => setShiftNote({ ...shiftNote, note: e.target.value })}
        />
        <Button
          mt="10px"
          color="white"
          bg="var(--header-bg)"
          p="10px 20px"
          onClick={() => {
            handleUpdateShiftNote();
          }}
        >
          Save
        </Button>
      </Box>
      <Box mt="15px" borderBottom={"1px solid #DDDCDD"} pb="15px">
        <HouseKeepingTasksList
          shiftId={shiftId ?? ""}
          displayManagerColumns={false}
          fetchMyTasksOnly={true}
        />
      </Box>
    </>
  );
};

export default ShiftDetails;
