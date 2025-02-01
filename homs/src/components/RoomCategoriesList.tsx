import React, { useEffect, useState } from "react";
import roomService from "../services/room-service";
import { CanceledError } from "axios";
import {
  Container,
  HStack,
  Icon,
  IconButton,
  Text,
  Table,
  VStack,
  Heading,
  Flex,
  DialogBackdrop,
  DialogTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@chakra-ui/react";
import { Checkbox } from "./ui/checkbox";
import { BsTools } from "react-icons/bs";
import { Tooltip } from "./ui/tooltip";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import RoomCategories from "../pages/RoomCategories";
import ActionIcons from "./ActionIcons";
import DataTable from "./DataTable";
import { FaEye } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRoomSetup } from "../contexts/RoomSetupProvider";
import TableStatistics from "./TableStatistics";
import CrudDialog from "./CrudDialog";
import RoomCategoriesForm from "./RoomCategoriesForm";
import { DialogRoot } from "./ui/dialog";
import RoomCategoryEditDialog from "./RoomCategoryEditDialog";
import RoomCategoryViewDialog from "./RoomCategoryViewDialog";
import RoomCategoryDeleteDialog from "./RoomCategoryDeleteDialog";

export interface Category {
  id: string;
  name: string;
  amenities: string[] | null;
}

interface Props {
  data: Category[];
  heading: string;
  setRoomCategories: (value: Category[]) => void;
}

const RoomCategoriesList = ({ data, heading, setRoomCategories }: Props) => {
  const [selection, setSelection] = useState<string[]>([]);

  const viewTriggerBtn = (
    <Tooltip content={`View ${heading}`}>
      <Button
        size={"xs"}
        _hover={{
          transform: "scale(1.1)",
          border: "1px solid var(--darkened-bg-2)",
          bg: "var(--darkened-bg)",
        }}
      >
        <FaEye />
      </Button>
    </Tooltip>
  );
  const editTriggerBtn = (
    <Tooltip content="Edit Category">
      <IconButton
        size={"xs"}
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.3s ease-out",
          border: "1px solid var(--darkened-bg-2)",
          bg: "var(--darkened-bg)",
        }}
      >
        <MdEdit />
      </IconButton>
    </Tooltip>
  );

  const deleteTriggerBtn = (
    <Tooltip content="Delete Category">
      <IconButton
        size={"xs"}
        _hover={{
          transform: "scale(1.1)",
          border: "1px solid var(--darkened-bg-2)",
          bg: "var(--darkened-bg)",
        }}
      >
        <BiTrash />
      </IconButton>
    </Tooltip>
  );

  const table = "roomcategory";

  return (
    <>
      <Table.Root mt="50px" mb="20px" size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              p="10px"
            >
              Category
            </Table.ColumnHeader>
            <Table.ColumnHeader
              bg="var(--darkened-bg-2)"
              color="black"
              p="10px"
            ></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((category) => (
            <Table.Row key={category.id} bg="white">
              <Table.Cell px="30px" py="5px">
                {category.name}
              </Table.Cell>
              <Table.Cell px="30px" py="5px">
                {/* <RoomCategoryEditDialog roomCategory={category}  /> */}
                <Flex justifyContent={"flex-end"} w={"100%"}>
                  <RoomCategoryViewDialog roomCategory={category} />
                  <RoomCategoryEditDialog roomCategory={category} />
                  <RoomCategoryDeleteDialog roomCategory={category} />
                </Flex>
                {/* <ActionIcons roomtype={category} /> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <TableStatistics heading={heading} data={data} />
    </>
  );
};

export default RoomCategoriesList;
