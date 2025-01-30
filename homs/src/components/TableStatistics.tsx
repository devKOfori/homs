import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { data } from "react-router-dom";

interface Props {
  heading: string;
  data: any[];
}

const TableStatistics = ({ heading, data }: Props) => {
  return (
    <HStack>
      <Text>{data.length}</Text>
      <Text>{heading.endsWith("y") ? `${heading.slice(0, -1)}ies` : ""}</Text>
    </HStack>
  );
};

export default TableStatistics;
