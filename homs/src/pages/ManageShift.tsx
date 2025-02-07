import DashboardLayout from "../layouts/DashboardLayout";
import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthProvider";
import { Field } from "../components/ui/field";
import { Table } from "@chakra-ui/react";
import ShiftWorkingDay from "../components/ShiftWorkingDay";
import { useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(utc);
dayjs.extend(objectSupport);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/New_York");

const ManageShift = () => {
  const [shiftPeriod2, setShiftPeriod2] = useState({
    from: dayjs().tz("America/New_York"),
    to: dayjs().tz("America/New_York"),
  });
  const { auth } = useAuth();
  const department = auth?.department;

  console.log(shiftPeriod2);

  const endDate = dayjs({
    year: shiftPeriod2.to.year(),
    month: shiftPeriod2.to.month(),
    day: shiftPeriod2.to.date(),
    hour: 23,
    minute: 59,
    second: 59,
  });

  const getDatesInPeriod = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
    const dates = [];
    let currentDate = from;
    while (currentDate.isBefore(to) || currentDate.isSame(to)) {
      dates.push(new Date(currentDate.toISOString()));
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  };

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
                shiftPeriod2.from
                  ? shiftPeriod2.from.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const newDate = e.target.value
                  ? dayjs.tz(e.target.value, "America/New_York")
                  : dayjs.tz();
                setShiftPeriod2((prev) => ({ ...prev, from: newDate }));
              }}
            />
          </Field>
          <Field label="To">
            <Input
              type="date"
              px="10px"
              value={
                shiftPeriod2.to
                  ? shiftPeriod2.to.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => {
                const newDate = e.target.value
                  ? dayjs.tz(e.target.value, "America/New_York")
                  : dayjs.tz();
                setShiftPeriod2((prev) => ({ ...prev, to: newDate }));
              }}
            />
          </Field>
        </HStack>
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
            {getDatesInPeriod(shiftPeriod2.from, endDate).map((date) => (
              <ShiftWorkingDay
                key={date.toISOString()}
                shiftDate={date}
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
