import React, { useState } from "react";
import { Room } from "./RoomList";
import { HStack, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "./ui/field";
import { NativeSelectRoot, NativeSelectField } from "./ui/native-select";
import {
  RoomSetupContextProps,
  useRoomSetup,
} from "../contexts/RoomSetupProvider";
import { maintenanceOptions } from "../RoomMaintenanceOptions";
import AmenitiesLoad from "./AmenitiesLoad";
import { Button } from "./ui/button";
import roomService from "../services/room-service";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import RoomForm from "./RoomForm";
import RecordEditDialog from "./RecordEditDialog";
interface Props {
  room: Room;
}

const RoomEditDialog = ({ room }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  
  return (
    <>
      <RecordEditDialog>
        {/* <RoomForm room={room} setDialogOpened={setOpen} /> */}
        <RoomForm room={room} />
      </RecordEditDialog>
    </>
  );
};

export default RoomEditDialog;
