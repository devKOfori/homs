import { Box, HStack, VStack, Text, Container, Heading, Flex } from '@chakra-ui/react'
import { RoomType } from './RoomTypeList'

interface Props {
    roomtype: RoomType;
}

const RoomTypeDetails = ({ roomtype }: Props) => {
  return (
    <VStack>
        <Container mt='20px' mb='10px'>
            <Heading color='#473647' size='lg'>Amenities</Heading>  
            <Container>
                <Container>
                    {
                        <Flex gap='10px'>
                            {roomtype.amenities?.map((amenity)=>(
                                <Text key={amenity}>{amenity}</Text>
                            ))}
                        </Flex>
                    }
                </Container>
            </Container>
        </Container>
        <Container mb='10px'>
            <Heading color='#473647' size='lg'>Area</Heading>  
            <Container>
                <Text>{`Area (m/ft): ${roomtype.area_in_meters} / ${roomtype.area_in_feet}`}</Text>
            </Container>
        </Container>
        <Container mb='10px'>
            <Heading color='#473647' size='lg'>Rate</Heading>  
            <Container>
                <Text>{roomtype.rate}</Text>
            </Container>
        </Container>
        <Container mb='10px'>
            <Heading color='#473647' size='lg'>Max. Guests</Heading>  
            <Container>
                <Text>{roomtype.max_guests}</Text>
            </Container>
        </Container>
        <Container mb='10px'>
            <Heading color='#473647' size='lg'>Bed Types</Heading>  
            <Container>
            <Container>
                    {
                    <Flex gap='10px'>
                        {roomtype.bed_types?.map((amenity)=>(
                            <Text key={amenity}>{amenity}</Text>
                        ))}
                    </Flex>
                    }
                </Container>
            </Container>
        </Container>
    </VStack>
  )
}

export default RoomTypeDetails
