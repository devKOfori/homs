import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
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
import CustomDialogHeader from "./CustomDialogHeader";
import RoomTypeDetails from "./RoomTypeDetails";
import { RoomType } from "./RoomTypeList";
import { useState } from "react";
import { Tooltip } from "./ui/tooltip";

interface Props {
  roomType: RoomType;
}

const RoomTypeViewDialog = ({ roomType }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  return (
    <Tooltip content={`View Type`}>
      <DialogRoot
        size="lg"
        placement="center"
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DialogTrigger>
          <Button
            size="xs"
            _hover={{
              bg: "var(--hairline-background-faint)",
            }}
          >
            <FaEye color="var(--logo-color)" />
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" color="#473647">
          <CustomDialogHeader heading={`${roomType.name}`} />
          <DialogBody p={{ base: "0.5rem", md: "1.3rem 1.5rem" }}>
            <RoomTypeDetails roomType={roomType} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Tooltip>
  );
};

export default RoomTypeViewDialog;
