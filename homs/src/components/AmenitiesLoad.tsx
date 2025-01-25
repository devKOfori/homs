import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Button } from './ui/button';
import { Tooltip } from './ui/tooltip';

interface Props {
    data: any[];
    selectedAmenities: string[];
    setSelectedAmenities: (value: string[])=>void;
}

const AmenitiesLoad = ({ data, selectedAmenities, setSelectedAmenities }: Props) => {
  return (
    <Flex gap='10px'>
        {data.map((amenity)=>(
            <Tooltip content={selectedAmenities.includes(amenity.name) ? 'Remove' : 'Add'}>
                <Button size='xs' key={amenity.id} 
            color={selectedAmenities.includes(amenity.name) ? 'white' : '#473647'}
            border='1px solid #473647' 
            bg={selectedAmenities.includes(amenity.name) ? '#473647' : 'white'}
            w='auto' h='20px'
            rounded='10px' px='10px' fontSize='10px'
            _hover={{
                bg: '#DDDCDD',
                border: '1px solid #473647',
            }}
            onClick={()=>{
                if(selectedAmenities.includes(amenity.name)){
                    setSelectedAmenities(selectedAmenities.filter((item)=> item !== amenity.name))
                }else{
                    setSelectedAmenities([...selectedAmenities, amenity.name])
                }
            }}
            >
                {amenity.name}
            </Button>
            </Tooltip>
            
        ))}
    </Flex>
  )
}

export default AmenitiesLoad
