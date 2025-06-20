import React, { useState } from "react";
import { RiPencilLine } from "react-icons/ri";
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
import CustomDialogTrigger from "./CustomDialogTrigger";
import { Button } from "./ui/button";
import CustomDialogHeader from "./CustomDialogHeader";
import { HStack, Input, Text } from "@chakra-ui/react";
import RoomForm from "./RoomForm";
import { Room } from "./RoomList";

interface Props {
  room: Room;
}

const RecordEditDialog = ({ room }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  return (
    <>
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
            // onClick={() => setOpen(true)}
          >
            <RiPencilLine color="var(--logo-color)" />
          </Button>
        </DialogTrigger>
        <DialogContent bg={"white"}>
          <CustomDialogHeader heading={"Edit Record"} />
          <DialogBody p={{ base: "0.5rem", md: "1.3rem 1.5rem" }}>
            <div>
              {error && <Text color="red">{error}</Text>}
              <RoomForm room={room} setDialogOpened={setOpen} />
            </div>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default RecordEditDialog;
