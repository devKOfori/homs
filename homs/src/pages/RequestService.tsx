import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { BiRestaurant } from 'react-icons/bi'
import HotelService from '../components/HotelService'
import { FaRunning } from 'react-icons/fa'
import { FaSwimmer } from 'react-icons/fa'
import { TbPhysotherapist } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const RequestService = () => {
  return (
    <>
    <Flex  justifyContent='center' >
        <Container maxWidth='1000px' marginY='20px' padding='30px' minHeight='300px' bg='white' rounded='10px' shadow='sm' border='1px solid #a6a6a6'>
        <Text marginBottom='20px'>Request Service</Text>
        <Flex gap='10px' justifyContent='center' alignItems='center' height='inherit'>
            <Link to='/'>
            <HotelService service='Restaurant' icon={<BiRestaurant />} link='/' />
            </Link>
            <Link to='/'>
            <HotelService service='Gym' icon={<FaRunning />} link='/' />
            </Link>
            <Link to='/'>
            <HotelService service='Pool' icon={<FaSwimmer />} link='/' />
            </Link>
            <Link to='/'>
            <HotelService service='Spa' icon={<TbPhysotherapist />} link='/' />    
            </Link>
        </Flex>
        </Container>
    </Flex>
    </>
    
    
  )
}

export default RequestService
