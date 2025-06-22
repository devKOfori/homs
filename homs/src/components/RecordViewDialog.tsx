import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaEye } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import CustomDialogHeader from "./CustomDialogHeader";
import { record } from "zod";

interface Props {
    children?: React.ReactNode;
    // record: any;
}

const RecordViewDialog = ({children}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      size="lg"
      placement="center"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior={"inside"}
    >
      <DialogTrigger>
        <Button
          size="xs"
          _hover={{
            bg: "var(--hairline-background-faint)",
          }}
        >
          <RiEyeLine color="var(--logo-color)" />
        </Button>
      </DialogTrigger>
      <DialogContent bg="white" color="#473647">
        <CustomDialogHeader heading="View Record" />
        <DialogBody p={{ base: "0.5rem", md: "1.3rem 1.5rem" }}>
            {children}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default RecordViewDialog;
