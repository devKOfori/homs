import {useState} from "react";
import { Container, Heading } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import LoginFlow from "../components/LoginFlow";
import ResetPasswordForm from "../components/ResetPasswordForm";
import ResetPasswordCodeInput from "../components/ResetPasswordCodeInput";



const ResetPassword = () => {
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<boolean>(false);
  

  return (
    <>
      <LoginFlow>
        {resetPasswordSuccess ? (
          <ResetPasswordCodeInput />
        ) : (
          <ResetPasswordForm
            setResetPasswordSuccess={setResetPasswordSuccess}
          />
        )}
      </LoginFlow>
    </>
  );
};

export default ResetPassword;
