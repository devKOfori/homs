import React, { useState } from "react";
import LoginFlow from "./LoginFlow";
import Login from "../pages/Login";
import { Field } from "../components/ui/field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Center, Container, Heading, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import authService from "../services/auth-service";
import ResetPasswordNewPasswordForm from "./ResetPasswordNewPasswordForm";

type ResetPasswordCodeInputFormInputs = {
  reset_code: string;
};

const ResetPasswordCodeInput = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [resetCodeValid, setResetCodeValid] = useState<boolean>(false);
  const [resetId, setResetId] = useState<string>("");

  const { register, handleSubmit } =
    useForm<ResetPasswordCodeInputFormInputs>();

  const onSubmit = (data: ResetPasswordCodeInputFormInputs) => {
    var resetCode = data.reset_code.trim();
    console.log("Reset Code:", resetId); // Log the reset code for debugging
    const request = authService.validateResetCode(resetCode);
    request.then((response) => {
      console.log("Reset code validated successfully", response);
      setError(null); // Clear any previous error
      setResetCodeValid(true);
      setResetId(resetCode);
      // Handle success (e.g., redirect to password reset form)
    });
    request.catch((error) => {
      setError(
        error.response?.data?.error ||
          "An error occurred while validating the reset code."
      );
      // Handle error (e.g., show an error message)
    });
  };

  console.log("Reset ID:", resetId); // Log the reset ID for debugging
  return (
    <>
      {resetCodeValid ? (
        <ResetPasswordNewPasswordForm resetId={resetId} />
      ) : (
        <>
          <Heading
            as="h2"
            size="lg"
            textAlign="center"
            color="#6D66C8"
            mb="20px"
          >
            Enter Reset Code
          </Heading>
          <Box>
            <Heading as="h3" size="md" mb="3px">
              We have sent you a reset code.
            </Heading>
            <Text fontSize="sm" color="gray.400">
              Check your email or SMS for the code and enter it below to reset
              your password.
            </Text>
          </Box>
          {error && (
            <Container
              bg="red.100"
              color="red.800"
              p="10px"
              borderRadius="5px"
              mb="10px"
            >
              {error}
            </Container>
          )}
          <Container>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <Field mt={"20px"} mb="10px" required>
                <input
                  type="text"
                  {...register("reset_code")}
                  placeholder="Enter your reset code"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #E2EAF4",
                    backgroundColor: "white",
                  }}
                  required
                />
              </Field>

              <Container my="10px">
                <Button
                  type="submit"
                  bg="#e6d8c3"
                  color="white"
                  padding="20px"
                  mb="10px"
                  mr="10px"
                  width={"100%"}
                >
                  Submit
                </Button>
              </Container>
              <Center>
                <Text
                  fontSize={"xs"}
                  _hover={{ textDecoration: "underline" }}
                  color="gray.400"
                >
                  Didn't receive a code? <Link to="#">Resend</Link>
                </Text>
              </Center>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default ResetPasswordCodeInput;
