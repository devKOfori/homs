import React from "react";
import { DialogCloseTrigger, DialogHeader, DialogTitle } from "./ui/dialog";
import { Heading } from "@chakra-ui/react";
import "./CustomDialogHeader.css";

interface Props {
  heading: string;
}

const CustomDialogHeader = ({ heading }: Props) => {
  return (
    <DialogHeader
      borderBottom="1px solid var(--border-bottom-color)"
      py="1rem"
      px={{ base: "0.5rem", md: "1.3rem 1.5rem" }}
      className="custom-dialog-header"
    >
      <DialogTitle>
        <Heading>{heading}</Heading>
      </DialogTitle>
      <DialogCloseTrigger
        color="red.700"
        // border="1px solid black"
        bg="red.400"
        _hover={{
          bg: "red.500",
          color: "red.900",
          fontWeight: "bold",
          // transform: "scale(1.05) translateY(-2px)",
          // transition: "transform 0.3s ease-in-out",
        }}
      />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
