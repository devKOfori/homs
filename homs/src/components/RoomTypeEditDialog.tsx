import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaPen } from "react-icons/fa";
import CustomDialogHeader from "./CustomDialogHeader";
import { Field } from "./ui/field";
import { HStack, Input, Text } from "@chakra-ui/react";
import AmenitiesLoad from "./AmenitiesLoad";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { RoomType } from "./RoomTypeList";
import roomService from "../services/room-service";
import RoomTypeForm from "./RoomTypeForm";
import RecordEditDialog from "./RecordEditDialog";

interface Props {
  roomType: RoomType;
}

const RoomTypeEditDialog = ({ roomType }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");

  return (
    <>
      <RecordEditDialog>
        <RoomTypeForm roomType={roomType} setDialogOpened={setOpen} />
      </RecordEditDialog>
    </>
  );
};

export default RoomTypeEditDialog;
