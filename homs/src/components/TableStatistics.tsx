import { HStack, Text } from "@chakra-ui/react";

interface Props {
  heading: string;
  data: any[];
}

const TableStatistics = ({ heading, data }: Props) => {
  return (
    <HStack>
      <Text>{data.length}</Text>
      <Text>
        {heading.endsWith("y") ? `${heading.slice(0, -1)}ies` : `${heading}s`}
      </Text>
    </HStack>
  );
};

export default TableStatistics;
