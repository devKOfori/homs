import { Heading, Table, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import hotelService from "../services/hotel-service";
import { FaEllipsisV } from "react-icons/fa";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import HouseKeepingTasksRow from "./HouseKeepingTasksRow";
import HouseKeepingTaskFilters from "./HouseKeepingTaskFilters";

export type HouseKeepingTask = {
  id?: string;
  room: string;
  shift: string;
  member_shift: string;
  assignment_date: string;
  assigned_to: string;
  title?: string;
  description: string;
  priority: string;
  status: string;
  created_by: string;
  profile_name: string;
};

interface Props {
  shiftId?: string;
  showFilters?: boolean;
  fetchMyTasksOnly?: boolean;
  displayManagerColumns?: boolean;
}

const HouseKeepingTasksList = ({
  shiftId,
  showFilters,
  fetchMyTasksOnly,
  displayManagerColumns,
}: Props) => {
  const [houseKeepingTasks, setHouseKeepingTasks] = useState<
    HouseKeepingTask[]
  >([]);
  useEffect(() => {
    const { request, cancel } = hotelService.getHouseKeepingTasks(
      shiftId,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      fetchMyTasksOnly
    );
    request.then((res) => {
      setHouseKeepingTasks(res.data);
      console.log(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }, [shiftId]);
  return (
    <>
      <Heading fontWeight={300}>House Keeping Tasks</Heading>
      {showFilters && (
        <HouseKeepingTaskFilters setHouseKeepingTasks={setHouseKeepingTasks} />
      )}
      <Table.Root mt="10px" mb="20px" size="sm" interactive overflow={"scroll"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Room #
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Title
            </Table.ColumnHeader>
            {displayManagerColumns && (
              <>
                <Table.ColumnHeader
                  bg={"var(--hairline-background-faint)"}
                  className="table-column-header"
                >
                  Assigned To
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  bg={"var(--hairline-background-faint)"}
                  className="table-column-header"
                >
                  Assigned On
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  bg={"var(--hairline-background-faint)"}
                  className="table-column-header"
                >
                  Shift
                </Table.ColumnHeader>
              </>
            )}
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Priority
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Instruction
            </Table.ColumnHeader> */}
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            >
              Status
            </Table.ColumnHeader>
            {/* <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Assigned On
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              px="30px"
              py="5px"
            >
              Assigned By
            </Table.ColumnHeader> */}
            <Table.ColumnHeader
              bg={"var(--hairline-background-faint)"}
              className="table-column-header"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {houseKeepingTasks.length > 0 ? (
            houseKeepingTasks.map((task) => (
              <HouseKeepingTasksRow
                key={task.id}
                task={task}
                setHouseKeepingTasks={setHouseKeepingTasks}
                displayManagerColumns={displayManagerColumns}
              />
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={8}
                bg="white"
                color="black"
                className="table-row-cell"
              >
                No tasks found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default HouseKeepingTasksList;
