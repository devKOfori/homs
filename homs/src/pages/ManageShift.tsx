import DashboardLayout from "../layouts/DashboardLayout";
import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import { Field } from "../components/ui/field";
import { Table } from "@chakra-ui/react";
import ShiftWorkingDay from "../components/ShiftWorkingDay";
import { useState } from "react";

const ManageShift = () => {
  const [shiftPeriod, setShiftPeriod] = useState({
    from: new Date(),
    to: new Date(),
  });
  const { auth } = useAuth();
  const department = auth?.department;

  console.log(shiftPeriod);

  // const getDatesInPeriod = (from: Date, to: Date) => {
  //   const dates = [];
  //   let currentDate = new Date(from);
  //   while (currentDate <= to) {
  //     // console.log(from, to);
  //     dates.push(new Date(currentDate));
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return dates;
  // };
  const getDatesInPeriod2 = (shiftPeriod: { from: Date; to: Date }) => {
    // console.log(shiftPeriod.from <= shiftPeriod.to);

    const dates = [];
    let currentDate = new Date(shiftPeriod.from);
    const endDate = new Date(
      shiftPeriod.to.getFullYear(),
      shiftPeriod.to.getMonth(),
      shiftPeriod.to.getDate(),
      23,
      59,
      59
    );
    console.log("endDate", shiftPeriod.to);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      console.log("pushed", currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      console.log("currentDate", currentDate);
    }
    return dates;
  };

  // console.log(getDatesInPeriod(shiftPeriod.from, shiftPeriod.to));

  return (
    <DashboardLayout>
      <HStack mb="5">
        <Heading fontWeight={300}>Shift Management</Heading>
        <Heading color="var(--header-bg)">
          [{localStorage.getItem("department")}]
        </Heading>
      </HStack>
      <Box bg="var(--hairline-color)" borderRadius="5px" px="10" pt="5" pb="7">
        <HStack gap="10" width="full" mb={2}>
          <Field label="From">
            <Input
              type="date"
              px="10px"
              value={
                shiftPeriod.from
                  ? shiftPeriod.from.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const newDate = e.target.value
                  ? new Date(e.target.value)
                  : new Date();
                setShiftPeriod((prev) => ({ ...prev, from: newDate }));
              }}
            />
          </Field>
          <Field label="To">
            <Input
              type="date"
              px="10px"
              value={
                shiftPeriod.to ? shiftPeriod.to.toISOString().split("T")[0] : ""
              }
              onChange={(e) => {
                const newDate = e.target.value
                  ? new Date(e.target.value)
                  : new Date();
                setShiftPeriod((prev) => ({ ...prev, to: newDate }));
              }}
            />
          </Field>
        </HStack>
        {/* <Button
          bg="var(--header-bg)"
          p="10px 20px"
          mt="10px"
          type="submit"
          color="white"
        >
          Process
        </Button> */}
      </Box>
      <Box>
        <Table.Root
          mt="50px"
          mb="20px"
          size="sm"
          showColumnBorder
          variant="outline"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px"
                py="5px"
              >
                Date
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px"
                py="5px"
              >
                Morning
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px"
                py="5px"
              >
                Afternoon
              </Table.ColumnHeader>
              <Table.ColumnHeader
                bg="var(--darkened-bg-2)"
                color="black"
                px="30px"
                py="5px"
              >
                Night
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* {getDatesInPeriod(shiftPeriod.from, shiftPeriod.to).map((date) => (
              // console.log(date),
              <ShiftWorkingDay
                key={date.toISOString()}
                date={date}
                department={department}
              />
            ))} */}
            {getDatesInPeriod2(shiftPeriod).map((date) => (
              // console.log(date),
              <ShiftWorkingDay
                key={date.toISOString()}
                date={date}
                department={department}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </DashboardLayout>
  );
};

export default ManageShift;
