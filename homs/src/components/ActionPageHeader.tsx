import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import "./ActionPageHeader.css";
import RoomTypeForm from "./RoomTypeForm";
import RoomCategoriesForm from "./RoomCategoriesForm";
import CrudDialog from "./CrudDialog";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import FloorForm from "./FloorForm";
import HotelViewForm from "./HotelViewForm";
import BedTypeForm from "./BedTypeForm";
import AmenityForm from "./AmenityForm";
import RoomForm from "./RoomForm";
import { RiAddLine } from "react-icons/ri";

interface Props {
  heading: string;
  table: string;
}

const ActionPageHeader = ({ heading, table }: Props) => {
  const { createDialogOpened, setCreateDialogOpened } = useRoomSetup();
  const createRecordDialogTriggerBtn = (
    <IconButton
      className="create-record-btn"
      p={"0.5rem  1rem"}
      border={"1px solid var(--logo-color);"}
      _hover={{bg: "var(--hairline-background)"}}
    >
      {`Add ${heading}`}
      <RiAddLine />
    </IconButton>
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
    case "room":
      dialogContentBody = (
        <RoomForm room={null} setDialogOpened={setCreateDialogOpened} />
      );
      break;
    default:
      break;
  }
  return (
    <Flex justify="space-between" align="center" wrap="wrap">
      <Heading fontWeight={500} color={"var(--logo-color)"}>{`${
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
