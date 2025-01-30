import {
  DialogActionTrigger,
  DialogBody,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogContent } from "@chakra-ui/react";
import CustomDialogHeader from "./CustomDialogHeader";
import RoomTypeCreateDialog from "./RoomTypeCreateDialog";
import RoomTypeForm from "./RoomTypeForm";

interface Props {
  table: string;
  dialogTrigger: any;
}

const CreateRecordDialog = ({ table, dialogTrigger }: Props) => {
  let heading;
  switch (table) {
    case "roomtype":
      heading = "Add New Room Type";
  }

  return (
    <DialogRoot size="lg" placement="center">
      <DialogBackdrop />
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent
        bg="white"
        color="#473647"
        p="20px 40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        // alignItems="center"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        // boxShadow="lg"
        rounded="md"
      >
        <CustomDialogHeader heading={heading} />
        <DialogBody p="20px">
          {table === "roomtype" && <RoomTypeForm roomType={null} />}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateRecordDialog;
