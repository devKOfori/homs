import { Group, Input, InputAddon } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "./ui/tooltip";
import hotelService from "../services/hotel-service";
import { HouseKeepingTask } from "./HouseKeepingTasksList";

interface Props {
  setHouseKeepingTasks: ([]: HouseKeepingTask[]) => void;
}

const HouseKeepingTaskFilters = ({ setHouseKeepingTasks }: Props) => {
  const [employeeName, setEmployeeName] = useState<string>("");
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
      <Group attached>
        <Input
          placeholder="Staff Name"
          p="5px"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />

        <InputAddon
          bg="white"
          p="10px"
          _hover={{
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          <Tooltip content="Search">
            <FaSearch />
          </Tooltip>
        </InputAddon>
      </Group>
    </>
  );
};

export default HouseKeepingTaskFilters;
