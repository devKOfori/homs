import React from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { HouseKeepingTask } from "./HouseKeepingTasksList";
import { DataList, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface Props {
  task: HouseKeepingTask;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TaskDetailDialog = ({ task, open, setOpen }: Props) => {
  return (
    <DialogRoot
      size="lg"
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger>
        <Text>View Task Details</Text>
      </DialogTrigger>
      <DialogContent bg="white" color="#473647" p="20px 40px">
        <DialogHeader borderBottom="1px solid #DDDCDD" pb="15px">
          <DialogTitle>
            <Heading fontWeight={300} color="var(--header-bg)">
              {task.title ?? `Task [ ${task.id} ] `}
            </Heading>
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody py="20px">
          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>Room Number</DataList.ItemLabel>
              <DataList.ItemValue>{task.room}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Task Title</DataList.ItemLabel>
              <DataList.ItemValue>{task.title ?? "N/A"}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Task Description</DataList.ItemLabel>
              <DataList.ItemValue>{task.description}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Task Priority</DataList.ItemLabel>
              <DataList.ItemValue>{task.priority}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Task Status</DataList.ItemLabel>
              <DataList.ItemValue>{task.status}</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Assigned On</DataList.ItemLabel>
              <DataList.ItemValue>
                {dayjs(task.assignment_date).format("ddd, MMMM DD YYYY")}
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Assigned By</DataList.ItemLabel>
              <DataList.ItemValue>{task.created_by}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default TaskDetailDialog;
