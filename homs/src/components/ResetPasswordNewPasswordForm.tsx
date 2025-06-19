import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import { Field } from "./ui/field";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import authService from "../services/auth-service";
import { Navigate } from "react-router-dom";

type ResetPasswordNewPasswordFormInputs = {
  reset_id?: string; // Optional reset ID if needed
  new_password: string;
  confirm_new_password: string;
};

interface Props {
  resetId?: string | null; // Optional reset ID if needed
}

const ResetPasswordNewPasswordForm = ({ resetId }: Props) => {
  const [error, setError] = React.useState<string | null>(null);
  const [redirectToLogin, setRedirectToLogin] = React.useState<boolean>(false);
  const { register, handleSubmit } =
    useForm<ResetPasswordNewPasswordFormInputs>();

  console.log("Reset ID:", resetId); // Log the reset ID for debugging

  const onSubmit = (data: ResetPasswordNewPasswordFormInputs) => {
    const request = authService.resetPasswordNewPassword(
      resetId || "", // Use the resetId prop or an empty string if not provided
      data.new_password,
      data.confirm_new_password
    );
    request.then((response) => {
      console.log("New password set successfully", response);
      setError(null); // Clear any previous error
      // redirect to the login page or show a success message
      setRedirectToLogin(true);
    });
    request.catch((error) => {
      console.error(
        error.response?.data?.error ||
          "An error occurred while setting the new password."
      );
      setError(
        error.response?.data?.error ||
          "An error occurred while setting the new password."
      );
      // Handle error (e.g., show an error message)
    });
  };

  if (redirectToLogin) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <>
      <Heading as="h2" size="lg" textAlign="center" color="#6D66C8" mb="20px">
        Create New Password
      </Heading>
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
          <Field label="New Password" mb={"10px"} required>
            <input
              {...register("new_password")}
              type="password"
              placeholder="New Password"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #E2EAF4",
                backgroundColor: "white",
              }}
            />
          </Field>
          <Field label="Confirm New Password" mb={"10px"} required>
            <input
              {...register("confirm_new_password")}
              type="password"
              placeholder="Confirm New Password"
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #E2EAF4",
                backgroundColor: "white",
              }}
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
              Save
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default ResetPasswordNewPasswordForm;
