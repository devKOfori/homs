import { DataListItem, DataListRoot } from "./ui/data-list";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import CustomDialogHeader from "./CustomDialogHeader";
import { HotelFloor } from "../pages/Floors";
import { useState } from "react";
import RecordViewDialog from "./RecordViewDialog";

interface Props {
  hotelFloor: HotelFloor;
}

const FloorViewDialog = ({ hotelFloor }: Props) => {
  return (
    <>
      <RecordViewDialog>
        <DataListRoot orientation="horizontal">
          <DataListItem label={"Name"} value={hotelFloor.name} />
        </DataListRoot>
      </RecordViewDialog>
    </>
  );
};

export default FloorViewDialog;
