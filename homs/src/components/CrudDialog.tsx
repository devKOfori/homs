import React from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "./ui/dialog";
import {
  DialogBackdrop,
  DialogContent,
  DialogTrigger,
  Heading,
} from "@chakra-ui/react";
import RoomCategoriesForm from "./RoomCategoriesForm";

interface Props {
  heading: string;
  table: string;
  dialogContentBody: React.ReactNode;
  triggerButton: React.ReactNode;
  open: boolean;
  setDialogOpened: (open: boolean) => void;
}

const CrudDialog = ({
  heading,
  table,
  dialogContentBody,
  triggerButton,
  open,
  setDialogOpened,
}: Props) => {
  return (
    <>
      <DialogRoot
        size={{"lg": "lg", "base": "xs"}}
        placement="center"
        open={open}
        onOpenChange={(e) => setDialogOpened(e.open)}
      >
        <DialogBackdrop/>
        <DialogTrigger>{triggerButton}</DialogTrigger>
        <DialogContent
          bg="white"
          color="#473647"
          p={{base: "1rem 0.5rem", lg: "20px 40px"}}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          // alignItems="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          rounded="md"
        >
          <DialogHeader borderBottom="1px solid #DDDCDD" pb="15px">
            <DialogTitle>
              <Heading>{heading}</Heading>
            </DialogTitle>
            <DialogCloseTrigger
              color="red.500"
              _hover={{
                bg: "transparent",
                color: "red.500",
                fontWeight: "bold",
                transform: "scale(1.05) translateY(-2px)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </DialogHeader>
          <DialogBody p={{base: "0.5rem", lg: "20px"}}>{dialogContentBody}</DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CrudDialog;
