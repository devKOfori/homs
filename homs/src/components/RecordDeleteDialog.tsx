import React, { useState } from "react";
import { BedType, useRoomSetup } from "../contexts/RoomSetupProvider";
import roomService from "../services/room-service";
import { Room } from "./RoomList";
import { RoomType } from "./RoomTypeList";
import { record } from "zod";

interface Props {
  record: Room | RoomType | BedType;
}

const RecordDeleteDialog = ({ record }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const { roomTypes, setRoomTypes } = useRoomSetup<RoomSetupContextProps>();

    const request = roomService.deleteRoomType(record.id ?? "");
    request.then((res) => {
      const updatedRoomTypes = roomTypes.filter(
        (rmType) => rmType.id !== roomType.id
      );
      setRoomTypes(updatedRoomTypes);
      setOpen(false);
      localStorage.setItem("roomTypes", JSON.stringify(updatedRoomTypes));
    });
    request.catch((err) => {
      setError(err.response.data.detail);
    });
  };

  return <div></div>;
};

export default RecordDeleteDialog;
