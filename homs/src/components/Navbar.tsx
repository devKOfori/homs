import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import './Navbar.css'

const Navbar = () => {
    const {username} = useAuth();
  return (
    <Box h='100%' className='navbar'>
        <Flex justify={'space-between'} align='center' h='100%' px='50px' wrap='wrap'>
          <Box className='logo' fontWeight={300}>
            Homs Dashboard
          </Box>
          <Flex align='center' wrap={'wrap'} gap='10px' fontWeight={300} fontSize='0.8875rem'>
            <Text color='var(--accent)'>Welcome, <strong>@{`${username}`}</strong></Text>
            <Text>View Profile</Text>
            <Text>Change Password</Text>
            <Text>Logout</Text>
          </Flex>
        </Flex>
    </Box>
    
  )
}

export default Navbar
