import React from "react";
import { Category } from "./RoomCategoriesList";
import { DataListItem, DataListRoot } from "./ui/data-list";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "./ui/dialog";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input, Text } from "@chakra-ui/react";
import CustomDialogHeader from "./CustomDialogHeader";
import { Field } from "./ui/field";

interface Props {
  roomCategory: Category;
}

const RoomCategoryViewDialog = ({ roomCategory }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string>("");
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
          <CustomDialogHeader heading={`${roomCategory.name}`} />
          <DialogBody>
            <DataListRoot orientation="horizontal">
              <DataListItem label={"Name"} value={roomCategory.name} />
              <DataListItem
                label={"Amenities"}
                value={roomCategory.amenities?.join(", ")}
              />
            </DataListRoot>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default RoomCategoryViewDialog;
