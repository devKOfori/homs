import { Heading } from "@chakra-ui/react";
import React from "react";
import CheckinForm from "../components/CheckinForm";
import { CheckInProvider } from "../contexts/CheckInContext";

const CreateCheckInPage = () => {
  return (
    <div>
      <Heading>Create Check-In</Heading>
      <CheckInProvider>
        <CheckinForm />
      </CheckInProvider>
    </div>
  );
};

export default CreateCheckInPage;
