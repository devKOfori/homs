import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contexts/AuthProvider'

const Navbar = () => {
    const {username} = useAuth();
  return (
    <Flex justifyContent='space-between' paddingX = '30px'>
        <Box></Box>
        <Flex gap='10px'>
        <Box>
            <HStack><Text>Welcome</Text><Text>{username}</Text></HStack>
        </Box>
        <Box><Text>Notifications</Text></Box>
        <Box><Text>Profile</Text></Box>
        <Box><Text>Logout</Text></Box>
        </Flex>
    </Flex>
  )
}

export default Navbar
