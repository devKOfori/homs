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
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import hotelService from "../services/hotel-service";
import { HouseKeepingTask } from "./HouseKeepingTasksList";
import { useHotelSetup } from "../contexts/HotelSetupProvider";
import { Button } from "./ui/button";

interface Props {
  setHouseKeepingTasks: (tasks: HouseKeepingTask[]) => void;
}

const HouseKeepingTaskFilters = ({ setHouseKeepingTasks }: Props) => {
  const [employeeName, setEmployeeName] = useState<string>("");
  const { shifts, shiftStatuses, priorities } = useHotelSetup() || {
    shifts: [],
  };

  const handleSearch = () => {
    console.log("searching...");
    const { request, cancel } = hotelService.getHouseKeepingTasks(
      undefined,
      employeeName
    );
    request.then((res) => {
      console.log(res.data);
      setHouseKeepingTasks(res.data);
    });
    request.catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <Stack spacing="20px">
        <HStack>
          <Input
            placeholder="Room #"
            p="5px"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <Input
            placeholder="Staff Name"
            p="5px"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </HStack>
        <HStack>
          <HStack>
            <Text>Assigned On</Text>
            <Input type="date" p="5px" />
          </HStack>
          <HStack>
            <Text>Shift:</Text>
            <NativeSelect.Root size="sm" width="240px">
              <NativeSelect.Field placeholder="Select option">
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
              <NativeSelect.Field placeholder="Select option">
                {shiftStatuses.map((shiftStatus) => (
                  <option key={shiftStatus.id} value={shiftStatus.id}>
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
            <NativeSelect.Field placeholder="Select option">
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </HStack>
      </Stack>
      <Button size="sm" bg="var(--header-bg)" color="white" p="10px 20px">
        Search
      </Button>
    </>
  );
};

export default HouseKeepingTaskFilters;
