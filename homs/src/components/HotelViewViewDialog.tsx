import { useState } from "react";
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
import { HotelView } from "./HotelViewList";
import RecordViewDialog from "./RecordViewDialog";

interface Props {
  hotelView: HotelView;
}

const HotelViewViewDialog = ({ hotelView }: Props) => {
  return (
    <>
      <RecordViewDialog>
        <DataListRoot orientation="horizontal">
          <DataListItem label={"Name"} value={hotelView.name} />
        </DataListRoot>
      </RecordViewDialog>
    </>
  );
};

export default HotelViewViewDialog;
