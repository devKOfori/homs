import { Box, Card, Flex, HStack, IconButton, Image } from "@chakra-ui/react";
// import {noProfilePicture} from "@/assets/no_profile_picture.png";
import noProfilePicture from "../assets/no_profile_picture.png";
import React from "react";
import { RiEyeLine, RiLogoutBoxRLine, RiMessageLine } from "react-icons/ri";
import { CheckInProps } from "../pages/CheckIn";
import { Button } from "./ui/button";

interface Props {
  checkIn: CheckInProps;
}

const CardDisplayCheckIn = ({ checkIn }: Props) => {
  const handleViewDetails = () => {
    // Implement view details functionality
    console.log("View details clicked");
  };

  return (
    <div>
      <Card.Root
        flexDirection={"row"}
        overflow={"hidden"}
        maxW={"xl"}
        border={"1px solid #bbbbbbff"}
        shadow={"sm"}
        backgroundColor={"white"}
        padding={"4px"}
        justifyContent={"space-between"}
        mt={"10px"}
        _hover={{ boxShadow: "md" }}
      >
        <Flex gap={"10px"} alignItems={"center"}>
          <Image
            objectFit={"cover"}
            maxW={"35px"}
            maxH={"35px"}
            src={noProfilePicture}
            borderRadius={"50%"}
            border={"1px solid black"}
          />
          <Box color={"black"}>
            <Card.Body fontSize={"sm"}>
              <HStack>
                <Box>{checkIn?.guestName || "John Doe"}</Box>
                <Box>{checkIn?.roomNumber || "RM00001"}</Box>
                <Box>
                  {checkIn?.numberOfGuests !== undefined
                    ? checkIn.numberOfGuests < 2
                      ? `${checkIn.numberOfGuests} Guest`
                      : `${checkIn.numberOfGuests} Guests`
                    : "No Guests"}
                </Box>
              </HStack>
            </Card.Body>
          </Box>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          //   border={"1px solid black"}
          padding={"4px"}
          gap="5px"
        >
          <Box>
            <Button
              //   border={"1px solid brown"}
              size="xs"
              _hover={{
                bg: "var(--hairline-background-faint)",
              }}
              onClick={handleViewDetails}
            >
              <RiEyeLine color="var(--logo-color)" />
            </Button>
          </Box>
          <Box>
            <Button
              //   border={"1px solid brown"}
              size="xs"
              _hover={{
                bg: "var(--hairline-background-faint)",
              }}
            >
              <RiMessageLine color="var(--logo-color)" />
            </Button>
          </Box>
          <Box>
            <Button
              //   border={"1px solid brown"}
              size="xs"
              _hover={{
                bg: "var(--hairline-background-faint)",
              }}
            >
              <RiLogoutBoxRLine color="var(--logo-color)" />
            </Button>
          </Box>
        </Flex>
      </Card.Root>
    </div>
  );
};

export default CardDisplayCheckIn;
