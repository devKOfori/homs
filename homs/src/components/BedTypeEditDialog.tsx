import { useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import { BedType } from "./BedTypeList";
import BedTypeForm from "./BedTypeForm";

interface Props {
  bedType: BedType;
}

const BedTypeEditDialog = ({ bedType }: Props) => {
    const [open, setOpen] = useState(false);
  return (
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
          <FaPen color="#473647" />
        </Button>
      </DialogTrigger>
      <DialogContent bg="white" color="#473647" p="20px 40px">
        <CustomDialogHeader heading={`Update Floor: ${bedType.id}`} />
        <DialogBody>
          <BedTypeForm bedType={bedType} setDialogOpened={setOpen} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default BedTypeEditDialog;
