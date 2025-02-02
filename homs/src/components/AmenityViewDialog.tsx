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
import { useState } from "react";

import { Amenity } from "./AmenityList";

interface Props {
  amenity: Amenity;
}

const AmenityViewDialog = ({ amenity }: Props) => {
    const [open, setOpen] = useState(false);
  return (
    <>
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
          <CustomDialogHeader heading={`${amenity.name}`} />
          <DialogBody>
            <DataListRoot orientation="horizontal">
              <DataListItem label={"Name"} value={amenity.name} />
            </DataListRoot>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default AmenityViewDialog;
