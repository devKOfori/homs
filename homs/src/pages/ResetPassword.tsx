import {useState} from "react";
import { Container, Heading } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import LoginFlow from "../components/LoginFlow";
import {useForm, SubmitHandler} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../services/auth-service";

type ResetPasswordFormInputs = {
  username: string;
  reset_channel: string;
};

const ResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  
  const {register, handleSubmit} = useForm<ResetPasswordFormInputs>()

  const onSubmit = (data: ResetPasswordFormInputs) => {
    const request = authService.resetPassword(data.username, data.reset_channel)
    request.then((response) => {
      console.log("Password reset request sent successfully", response);
      // Handle success (e.g., show a success message or redirect)
    });
    request.catch((error) => {
      setError(error.response?.data?.error || "An error occurred while resetting the password.");
      // Handle error (e.g., show an error message)
    });
  }

  return (
    <>
      <LoginFlow>
        <Heading as="h2" size="lg" textAlign="center" color="#6D66C8" mb="20px">
          Reset Password
        </Heading>
        {
          error && (
            <Container
              bg="red.100"
              color="red.800"
              p="10px"
              borderRadius="5px"
              mb="10px"
            >
              {error}
            </Container>
          )
        }
        <Container>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Field label="Username" mb="10px" color={"#6D66C8"} required>
              <input
                type="username"
                {...register("username")}
                placeholder="Enter your username"
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
            <Field label="Reset Channel" mb="10px" color={"#6D66C8"} required>
              <select
                {...register("reset_channel")}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #E2EAF4",
                  backgroundColor: "white",
                }}
                required
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
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
                Reset Password
              </Button>
            </Container>
          </form>
        </Container>
      </LoginFlow>
    </>
  );
};

export default ResetPassword;
