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
              transform: "scale(1.2) translateY(-2px)",
              transition: "transform 0.3s ease-out",
              bg: "#DDDCDD",
              border: "1px solid #473647",
            }}
          >
            <FaEye color="#473647" />
          </Button>
        </DialogTrigger>
        <DialogContent bg="white" color="#473647" p="20px 40px">
          <CustomDialogHeader heading={`${roomType.name}`} />
          <DialogBody>
            <RoomTypeDetails roomType={roomType} />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Tooltip>
  );
};

export default RoomTypeViewDialog;
