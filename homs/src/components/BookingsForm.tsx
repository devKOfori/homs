import React, { useState } from "react";
import BookingsGuestInfoForm from "./BookingsGuestInfoForm";
import { Box, Fieldset, Heading, HStack, Stack, Tabs } from "@chakra-ui/react";
import { Button } from "./ui/button";
import BookingsRoomInfoForm from "./BookingsRoomInfoForm";
import BookingsPaymentInfoForm from "./BookingsPaymentInfoForm";

const BookingsForm = () => {
  const [value, setValue] = useState("userInfo");
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    country: "",
    address: "",
    identification_type: "",
    identification_number: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
  });
  const tabValues = ["userInfo", "bookingInfo", "paymentInfo"];
  console.log(value);
  
  const handleOnValueChange = (tabValue: string) => {
    // const tabValue = e.value;
    setValue(tabValue);
    console.log(tabValues.indexOf(tabValue));
    setCurrentValueIndex(tabValues.indexOf(tabValue));
  }
  
  const handleBookingFormNavigation = (index: number) => {
    setValue(tabValues[index]);
    setCurrentValueIndex(index);
  };
  return (
    <Box px="15px">
      <form method="post">
        <Tabs.Root
          value={value}
          onValueChange={(e) => handleOnValueChange(e.value)}
          defaultValue="userInfo"
        >
          <Tabs.List gap="10px">
            <Tabs.Trigger color="black" value="userInfo">
              Guest Information
            </Tabs.Trigger>
            <Tabs.Trigger color="black" value="bookingInfo">
              Booking Information
            </Tabs.Trigger>
            <Tabs.Trigger color="black" value="paymentInfo">
              Payment Information
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="userInfo">
            <Fieldset.Root size="lg" px="20px" gap="3px" maxW="90%">
              <Stack>
                {/* <Fieldset.Legend color="black">
                  Guest Information
                </Fieldset.Legend> */}
                <BookingsGuestInfoForm />
              </Stack>
            </Fieldset.Root>
          </Tabs.Content>
          <Tabs.Content value="bookingInfo">
            <BookingsRoomInfoForm />
          </Tabs.Content>
          <Tabs.Content value="paymentInfo">
            <BookingsPaymentInfoForm />
          </Tabs.Content>
        </Tabs.Root>
        <HStack>
          <Button
            type="submit"
            p="10px 20px"
            bg="var(--header-bg)"
            color="white"
            disabled={currentValueIndex === 0}
            onClick={() => {
              handleBookingFormNavigation(currentValueIndex - 1);
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            p="10px 20px"
            bg="var(--header-bg)"
            color="white"
            disabled={currentValueIndex === 2}
            onClick={() => {
              handleBookingFormNavigation(currentValueIndex + 1);
            }}
          >
            Next
          </Button>
          {currentValueIndex === 2 && (
            <Button
              type="submit"
              p="10px 20px"
              bg="var(--header-bg)"
              color="white"
            >
              Save
            </Button>
          )}
        </HStack>
      </form>
    </Box>
  );
};

export default BookingsForm;
