import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { IconBaseProps } from 'react-icons';
import { BiRestaurant } from 'react-icons/bi'
import { Link } from 'react-router-dom';

interface Props {
    service: string;
    icon: React.ComponentType<IconBaseProps>;
    link: string
}

const HotelService = ({service, icon, link}: Props) => {
  return (
    <Box shadow='sm' border='1px solid black' width='150px' height='150px' rounded='10px'>
        <Flex justifyContent='center' alignItems='center' height='inherit' gap='5px'>
            <Link to={link}>
                <Text textAlign={"center"}>{service}</Text>
            </Link>
            {icon}
        </Flex>
    </Box>
  )
}

export default HotelService
