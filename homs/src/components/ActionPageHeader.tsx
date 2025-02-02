import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Category } from "./RoomCategoriesList";
import { FaEye, FaPlus } from "react-icons/fa";
import {
  DialogActionTrigger,
  DialogBackdrop,
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
import CreateRecordDialog from "./CreateRecordDialog";
import "./ActionPageHeader.css";
import RoomTypeForm from "./RoomTypeForm";
import RoomCategoriesForm from "./RoomCategoriesForm";
import CrudDialog from "./CrudDialog";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import { set } from "react-hook-form";
import FloorForm from "./FloorForm";
import HotelViewForm from "./HotelViewForm";
import BedTypeForm from "./BedTypeForm";
import AmenityForm from "./AmenityForm";

interface Props {
  heading: string;
  table: string;
}

const ActionPageHeader = ({ heading, table }: Props) => {
  const { createDialogOpened, setCreateDialogOpened } = useRoomSetup();
  const createRecordDialogTriggerBtn = (
    <Button
      px="10px"
      bg="#747474"
      color="white"
      rounded="25px"
      p="10px"
      size="xs"
      fontSize="xs"
      _hover={{
        transform: "scale(1.05) translateY(-2px)",
        transition: "transform 0.3s ease-out",
      }}
    >
      {`Add ${heading}`} <FaPlus />
    </Button>
  );

  let dialogContentBody = null;
  switch (table) {
    case "roomcategory":
      dialogContentBody = (
        <RoomCategoriesForm
          setDialogOpened={setCreateDialogOpened}
          roomCategory={null}
        />
      );
      break;
    case "roomtype":
      dialogContentBody = (
        <RoomTypeForm roomType={null} setDialogOpened={setCreateDialogOpened} />
      );
      break;
    case "floor":
      dialogContentBody = (
        <FloorForm hotelFloor={null} setDialogOpened={setCreateDialogOpened} />
      );
      break;
    case "hotelView":
      dialogContentBody = (
        <HotelViewForm hotelView={null} setDialogOpened={setCreateDialogOpened} />
      )
      break;
    case "bedtype": 
      dialogContentBody = (
        <BedTypeForm bedType={null} setDialogOpened={setCreateDialogOpened} />
      )
      break;
    case "amenities":
      dialogContentBody = (
        <AmenityForm amenity={null} setDialogOpened={setCreateDialogOpened} />
      );
      break;
    default:
      break;
  }
  return (
    <Flex justify="space-between" align="center" wrap="wrap">
      <Heading fontWeight={300}>{`${
        heading.endsWith("y") ? heading.slice(0, -1) + "ies" : heading + "s"
      }`}</Heading>

      <CrudDialog
        heading={heading}
        table={table}
        dialogContentBody={dialogContentBody}
        setDialogOpened={setCreateDialogOpened}
        triggerButton={createRecordDialogTriggerBtn}
        open={createDialogOpened}
      />

      {/* <DialogRoot
        size="lg"
        placement="center"
        open={dialogOpened}
        onOpenChange={(e) => setDialogOpened(e.open)}
      >
        <DialogBackdrop />
        <DialogTrigger>{createRecordDialogTriggerBtn}</DialogTrigger>
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
            {table === "roomcategory" ? (
              <RoomCategoriesForm setDialogOpened={setDialogOpened} />
            ) : null}
          </DialogBody>
        </DialogContent>
      </DialogRoot> */}
    </Flex>
  );
};

export default ActionPageHeader;
