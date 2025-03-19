import React from "react";
import BookingsGuestInfoForm from "./BookingsGuestInfoForm";
import { Box, Fieldset, Stack } from "@chakra-ui/react";
import { Button } from "./ui/button";

const BookingsForm = () => {
  return (
    <Box px='15px'>
      <form method="post">
        <Fieldset.Root size="lg" px="20px" gap="3px" maxW="90%">
          <Stack>
            <Fieldset.Legend color="black">Guest Information</Fieldset.Legend>
            <BookingsGuestInfoForm />
          </Stack>
        </Fieldset.Root>
        <Button type='submit' p='10px 20px' bg='var(--header-bg)' color='white'>Save</Button>
      </form>
    </Box>
  );
};

export default BookingsForm;
