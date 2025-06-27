import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Heading } from "@chakra-ui/react";
import HouseKeepingTasksList from "../components/HouseKeepingTasksList";

const MyTasks = () => {
  return (
    <>
      <Heading fontWeight={300} color="var(--header-bg)">
        My Tasks
      </Heading>
      <HouseKeepingTasksList
        showFilters={false}
        displayManagerColumns={false}
        fetchMyTasksOnly={true}
      />
    </>
  );
};

export default MyTasks;
