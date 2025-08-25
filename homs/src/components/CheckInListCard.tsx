import React from "react";
import { CheckInProps } from "../pages/CheckIn";
import { Box, Card, Text } from "@chakra-ui/react";
import CardDisplayCheckIn from "./CardDisplayCheckIn";

interface CheckInListCardProps {
  checkIns: CheckInProps[];
}

const CheckInListCard = ({ checkIns }: CheckInListCardProps) => {
  return (
    <>
    {
        checkIns.length === 0 && (
           <Text>No check-ins available</Text>
        )
    }
      <Box>
        {checkIns.map((checkIn) => (
          <CardDisplayCheckIn key={checkIn.id} checkIn={checkIn} />
        ))}
      </Box>
    </>
  );
};

export default CheckInListCard;
