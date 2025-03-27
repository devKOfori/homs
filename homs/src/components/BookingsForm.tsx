import React, { useState } from "react";
import BookingsGuestInfoForm from "./BookingsGuestInfoForm";
import { Box, Fieldset, Heading, HStack, Stack, Tabs } from "@chakra-ui/react";
import { Button } from "./ui/button";
import BookingsRoomInfoForm from "./BookingsRoomInfoForm";
import BookingsPaymentInfoForm from "./BookingsPaymentInfoForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

  // const schema = z.object({
  //   title: z.string(),
  //   first_name: z.string(),
  //   last_name: z.string(),
  //   email: z.string().email(),
  //   phone_number: z.string(),
  // });

  const { register, handleSubmit, trigger } = useForm({
    shouldUnregister: false,
  });

  const tabValues = ["userInfo", "bookingInfo", "paymentInfo"];
  console.log(value);

  const handleOnValueChange = (tabValue: string) => {
    // const tabValue = e.value;
    setValue(tabValue);
    console.log(tabValues.indexOf(tabValue));
    setCurrentValueIndex(tabValues.indexOf(tabValue));
  };

  const handleBookingFormNavigation = (index: number) => {
    setValue(tabValues[index]);
    setCurrentValueIndex(index);
  };

  const nextTab = async () => {
    const isValid = await trigger();
    if (isValid) {
      console.log("is valid");
      setCurrentValueIndex((prev) => prev + 1);
      setValue(tabValues[currentValueIndex + 1]);
    }
  };

  const prevTab = () => {
    setCurrentValueIndex((prev) => prev - 1);
    setValue(tabValues[currentValueIndex - 1]);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box px="15px">
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
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
          {
            currentValueIndex > 0 && (
              <Button
                p="10px 20px"
                bg="var(--header-bg)"
                color="white"
                onClick={() => {
                  prevTab();
                }}
              >
                Back
              </Button>
            )
          }
          {currentValueIndex < 2 && (
            <Button
              p="10px 20px"
              bg="var(--header-bg)"
              color="white"
              disabled={currentValueIndex === 2}
              onClick={() => {
                nextTab();
              }}
            >
              Next
            </Button>
          )}
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
