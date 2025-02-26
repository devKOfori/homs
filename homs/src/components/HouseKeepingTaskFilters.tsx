import {
  Flex,
  Group,
  HStack,
  Input,
  InputAddon,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import hotelService from "../services/hotel-service";
import { HouseKeepingTask } from "./HouseKeepingTasksList";
import { useHotelSetup } from "../contexts/HotelSetupProvider";
import { Button } from "./ui/button";
import dayjs from "dayjs";

interface Props {
  setHouseKeepingTasks: (tasks: HouseKeepingTask[]) => void;
}

const HouseKeepingTaskFilters = ({ setHouseKeepingTasks }: Props) => {
  const [searchfilters, setSearchFilters] = useState({
    shiftId: "",
    roomNumber: "",
    staffName: "",
    assignedOn: "",
    status: "",
    priority: "",
  });
  const { shifts, shiftStatuses, priorities } = useHotelSetup() || {
    shifts: [],
    shiftStatuses: [],
    priorities: [],
  };

  useEffect(() => {
    const { request, cancel } = hotelService.getHouseKeepingTasks(
      searchfilters.shiftId,
      searchfilters.staffName,
      searchfilters.roomNumber,
      searchfilters.status,
      searchfilters.priority,
      searchfilters.assignedOn
    );
    request.then((res) => {
      console.log(res.data);
      setHouseKeepingTasks(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
    return () => cancel();
  }
  , [searchfilters.shiftId, searchfilters.staffName, searchfilters.roomNumber, searchfilters.status, searchfilters.priority, searchfilters.assignedOn]);


  // const handleSearch = () => {
  //   console.log("searching...");
  //   const { request, cancel } = hotelService.getHouseKeepingTasks(
  //     searchfilters.shiftId,
  //     searchfilters.staffName,
  //     searchfilters.roomNumber,
  //     searchfilters.status,
  //     searchfilters.priority,
  //     searchfilters.assignedOn
  //   );
  //   request.then((res) => {
  //     console.log(res.data);
  //     setHouseKeepingTasks(res.data);
  //   });
  //   request.catch((err) => {
  //     console.log(err);
  //   });
  // };
  return (
    <>
      <Stack>
        <HStack>
          <Input
            placeholder="Room #"
            p="5px"
            value={searchfilters.roomNumber}
            onChange={(e) =>
              setSearchFilters({ ...searchfilters, roomNumber: e.target.value })
            }
          />
          <Input
            placeholder="Staff Name"
            p="5px"
            value={searchfilters.staffName}
            onChange={(e) =>
              setSearchFilters({ ...searchfilters, staffName: e.target.value })
            }
          />
        </HStack>
        <HStack>
          <HStack>
            <Text>Assigned On</Text>
            <Input
              type="date"
              p="5px"
              value={searchfilters.assignedOn}
              onChange={(e) =>
                setSearchFilters({
                  ...searchfilters,
                  assignedOn: e.target.value,
                })
              }
            />
          </HStack>
          <HStack>
            <Text>Shift:</Text>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field
                placeholder="Select option"
                value={searchfilters.shiftId}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchfilters,
                    shiftId: e.target.value,
                  })
                }
              >
                {shifts.map((shift) => (
                  <option key={shift.id} value={shift.id}>
                    {shift.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </HStack>
          <HStack>
            <Text>Status:</Text>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field
                placeholder="Select option"
                value={searchfilters.status}
                onChange={(e) =>
                  setSearchFilters({ ...searchfilters, status: e.target.value })
                }
              >
                {shiftStatuses.map((shiftStatus) => (
                  <option key={shiftStatus.id} value={shiftStatus.name}>
                    {shiftStatus.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </HStack>
        </HStack>
        <HStack>
          <Text>Priority:</Text>
          <NativeSelect.Root size="sm" width="240px">
            <NativeSelect.Field
              placeholder="Select option"
              value={searchfilters.priority}
              onChange={(e) =>
                setSearchFilters({ ...searchfilters, priority: e.target.value })
              }
            >
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.name}>
                  {priority.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>
      </Stack>
      {/* <Button
        size="sm"
        bg="var(--header-bg)"
        color="white"
        p="10px 20px"
        onClick={handleSearch}
      >
        Search
      </Button> */}
      <Button
        size="sm"
        bg="gray"
        color="black"
        p="10px 20px"
        onClick={() => {
          setSearchFilters({
            shiftId: "",
            roomNumber: "",
            staffName: "",
            assignedOn: "",
            status: "",
            priority: "",
          });
        }}
      >
        Reset Filters
      </Button>
    </>
  );
};

export default HouseKeepingTaskFilters;
