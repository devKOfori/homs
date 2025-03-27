import React from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Heading } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "./ui/data-list";
import BookingsForm from "./BookingsForm";
import BookingsForm2 from "./BookingsForm2";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  dialogTriggerBtn: React.ReactNode;
}

const BookingCreateDialog = ({ open, setOpen, dialogTriggerBtn }: Props) => {
  return (
    <>
      <DialogRoot
        size="xl"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>
          <Button
            size="xs"
            // _hover={{
            //   transform: "scale(1.2) translateY(-2px)",
            //   transition: "transform 0.3s ease-out",
            //   bg: "#DDDCDD",
            //   border: "1px solid #473647",
            // }}
          >
            {dialogTriggerBtn}
          </Button>
        </DialogTrigger>
        <DialogContent color="#473647" height="99vh" overflowY="auto">
          <DialogHeader
            bg="var(--header-bg)"
            borderBottom="1px solid #DDDCDD"
            pb="15px"
          >
            <DialogTitle p="10px 20px">
              <Heading fontWeight={300} color="white">
                Create Booking Form
              </Heading>
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
          <DialogBody bg="white" py="20px">
            <BookingsForm2 setDialogOpened={setOpen}/>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default BookingCreateDialog;
