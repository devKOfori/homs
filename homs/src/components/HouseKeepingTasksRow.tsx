import { HouseKeepingTask } from "./HouseKeepingTasksList";
import { Table, Text } from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import utils from "../services/utils";
import { set } from "react-hook-form";
import RoomCleaningTaskDialog from "./RoomCleaningTaskDialog";
import TaskDetailDialog from "./TaskDetailDialog";
import { useState } from "react";
import dayjs from "dayjs";

interface Props {
  task: HouseKeepingTask;
  setHouseKeepingTasks: (
    tasks:
      | HouseKeepingTask[]
      | ((prev: HouseKeepingTask[]) => HouseKeepingTask[])
  ) => void;
}

const HouseKeepingTasksRow = ({ task, setHouseKeepingTasks }: Props) => {
    const [open, setOpen] = useState(false);
  const handleTaskUpdate = (status: string) => {
    console.log(task.id);
    const request = utils.updateTaskStatus(
      "houseKeeping",
      task.id ?? "",
      status
    );
    if (request) {
      request.then((res) => {
        setHouseKeepingTasks((prev) => {
          return prev.map((t) => {
            if (t.id === task.id) {
              return { ...t, status: res.data.status };
            }
            return t;
          });
        });
        console.log(res.data);
      });
      request.catch((err) => {
        console.log(err);
      });
    } else {
      console.log("Request is undefined");
    }
  };

  const roomCleaningDialogTrigger = <Text>Assign Support</Text>;

  return (
    <>
      <Table.Row key={task.id} bg="white">
        <Table.Cell px="30px" py="5px">
          {task.room}
        </Table.Cell>
        <Table.Cell px="30px" py="5px">
          {task.title || ""}
        </Table.Cell>
        <Table.Cell px="30px" py="5px">
            {task.profile_name}
        </Table.Cell>
        <Table.Cell px="30px" py="5px">
            {
                dayjs(task.assignment_date).format("ddd, MMMM DD YYYY")
            }
        </Table.Cell>
        <Table.Cell px="30px" py="5px">
            {task.shift}
        </Table.Cell>
        <Table.Cell px="30px" py="5px">
          {task.priority}
        </Table.Cell>
        {/* <Table.Cell px="30px" py="5px">
                        {task.description}
                    </Table.Cell> */}
        <Table.Cell px="30px" py="5px">
          {task.status}
        </Table.Cell>
        {/* <Table.Cell px="30px" py="5px">
                        {
                            dayjs(task.assignment_date).format("ddd, MMMM DD YYYY")
                        }
                    </Table.Cell>
                    <Table.Cell px="30px" py="5px">
                        {task.created_by}
                    </Table.Cell> */}
        <Table.Cell py="5px">
          <MenuRoot>
            <MenuTrigger asChild>
              <Button
                size="xs"
                color="var(--header-bg)"
                variant="plain"
                borderRadius="50%"
                bg="#f5f5f5"
                p="5px"
              >
                <Tooltip content="View Options">
                  <FaEllipsisV />
                </Tooltip>
              </Button>
            </MenuTrigger>
            <MenuContent bg="white" p="5px">
              <MenuItem
                value="start-task"
                color="black"
                p="5px"
                _hover={{
                  bg: "var(--header-bg)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Text onClick={() => handleTaskUpdate("Ongoing")}>
                  Start Task
                </Text>
              </MenuItem>

              <MenuItem
                value="request-help"
                color="black"
                p="5px"
                _hover={{
                  bg: "var(--header-bg)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Text onClick={() => handleTaskUpdate("Request Help")}>
                  Request Support
                </Text>
              </MenuItem>
              <MenuItem
                value="assign-support"
                color="black"
                p="5px"
                _hover={{
                  bg: "var(--header-bg)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <RoomCleaningTaskDialog
                  room={task.room}
                  task={task}
                  dialogTrigger={roomCleaningDialogTrigger}
                />
              </MenuItem>
              <MenuItem
                value="view-details"
                color="black"
                p="5px"
                _hover={{
                  bg: "var(--header-bg)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <TaskDetailDialog task={task} open={open} setOpen={setOpen} />
              </MenuItem>
              <MenuItem
                value="finish-task"
                color="black"
                p="5px"
                _hover={{
                  bg: "var(--header-bg)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <Text onClick={() => handleTaskUpdate("Ended")}>
                  Mark as Completed
                </Text>
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default HouseKeepingTasksRow;
