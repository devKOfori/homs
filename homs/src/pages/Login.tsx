import { Field } from "../components/ui/field";
import { Center, Container, Fieldset, Input, Text } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthProvider";
import { useState } from "react";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import LoginFlow from "../components/LoginFlow";

export interface Inputs {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const schema = z.object({
    username: z.string().min(1, { message: "Username field is required" }),
    password: z.string().min(1, { message: "Password field is required" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const { updateAuth } = useAuth();

  const onSubmit = (data: Inputs) => {
    const request = authService.login(data);
    request.then((response) => {
      const {
        refresh,
        access,
        username,
        user_id,
        profile_id,
        department,
        roles,
      } = response.data;
      localStorage.setItem("refreshToken", JSON.stringify(refresh));
      localStorage.setItem("accessToken", JSON.stringify(access));
      localStorage.setItem("username", username);
      localStorage.setItem("userId", user_id);
      localStorage.setItem("profileId", profile_id);
      localStorage.setItem("department", department);
      localStorage.setItem("roles", JSON.stringify(roles));
      updateAuth();
      navigate("/dashboard");
    });
    request.catch((error) => {
      console.log(error.response.data.detail);
      setError(error.response.data.detail);
    });
  };

  return (
    <LoginFlow>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Center>
            <Text fontSize={"2xl"} color={"#6D66C8"}>
              HOMS
            </Text>
          </Center>
          <Fieldset.ErrorText>Some fields are invalid</Fieldset.ErrorText>
          <Fieldset.Content>
            <Field label="Username" mb="5px" color={"#6D66C8"} required>
              <Input
                paddingX="5px"
                bg="white"
                border="1px solid #E2EAF4"
                {...register("username")}
              ></Input>
              {errors.username && <Text>{errors.username.message}</Text>}
            </Field>
            <Field label="Password" mb="10px" color={"#6D66C8"} required>
              <Input
                type="password"
                bg="white"
                paddingX="5px"
                border="1px solid #E2EAF4"
                {...register("password")}
              ></Input>
            </Field>
          </Fieldset.Content>
        </Fieldset.Root>
        <Container my="10px">
          <Button
            type="submit"
            disabled={!isValid}
            bg="#e6d8c3"
            color="white"
            padding="20px"
            mb="10px"
            mr="10px"
            width={"100%"}
          >
            Login
          </Button>
          <Center>
            <Link to="/reset-password">
              <Text fontSize={"xs"} _hover={{ textDecoration: "underline" }}>
                Forgot password?
              </Text>
            </Link>
          </Center>
        </Container>
      </form>
    </LoginFlow>
  );
};

export default Login;
