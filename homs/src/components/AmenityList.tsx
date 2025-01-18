import React from 'react'
import useAmenities, { Amenity } from '../hooks/useAmenities';
import { Box, Container, Flex, Text } from '@chakra-ui/react';

interface Props {
    amenities: Amenity[]
    error: string
}

const AmenityList = ({amenities, error}: Props) => {
    // const {amenities, error, isLoading} = useAmenities(roomNumber);
  return (
    <Box marginBottom={5}>
    {error && <div className='errorMessage'>{error}</div>}
    {
        amenities.length > 0 && 
        (
            <Flex gap='10px' alignItems={"center"}>
                {
                    amenities.map((amenity)=>(<Box key={amenity.id}><Text>{amenity.name}</Text></Box>))
                }
            </Flex>
        )
    }
    </Box>
  )
}

export default AmenityList
