import React, { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Heading } from "@chakra-ui/react";
import { Button } from "./ui/button";

interface CustomDialogProps {
  dialogTriggerIcon: React.ReactNode;
  dialogTitle: string;
  dialogBody: React.ReactNode;
  
}

const CustomDialog = ({
  dialogTriggerIcon,
  dialogTitle,
  dialogBody,
}: 
CustomDialogProps) => {
  const [open, setOpen] = useState(false);
  const triggerButton = (
    <Button
      size="xs"
      _hover={{
        transform: "scale(1.2) translateY(-2px)",
        transition: "transform 0.3s ease-out",
        bg: "#DDDCDD",
        border: "1px solid #473647",
      }}
    >
      {dialogTriggerIcon}
    </Button>
  );
  return (
    <>
      <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>{triggerButton}</DialogTrigger>
        <DialogContent bg="white" color="black" p="20px 40px">
          <DialogHeader color="var(--header-bg)">
            <DialogTitle>
              <Heading>{dialogTitle}</Heading>
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody p="20px">{dialogBody}</DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CustomDialog;
