import { Box, Button, Container, Flex, List, MenuItem, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { housekeepingMenuItems } from '../Menu'
import { Link } from 'react-router-dom'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import SidebarSearch from './SidebarSearch';
import './Sidebar.css'
import SidebarMenuList from './SidebarMenuList';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {

  return (
    // <Container bg='white' borderTopRadius='5px' height='90vh'>
    //   <Stack>
    //     <Box textAlign='center' p='20px' color='white' bg='#473647' borderRadius='inherit'>
    //         <Text my='15px'>Homs</Text>
    //         <Text my='15px'>Dashboard</Text>
    //     </Box>
    //     <Box borderRadius='inherit'>
    //       <List.Root variant='plain' my='15px' px='20px'>
    //           {housekeepingMenuItems.map((menuItem)=>(
    //               <Link 
    //               key={menuItem.url} 
    //               to={`/dashboard/${menuItem.url}`}
    //               >
    //                   <List.Item py='5px' px='10px'
    //                   display='block'
    //                   _hover={{
    //                     bg: '#DDDCDD',
    //                     border: '1px solid #473647',
    //                     borderRadius: '5px',
    //                     transform: 'scale(1.05)',
    //                     transition: 'transform 0.3s ease-out'
    //                   }}
    //                   >
    //                       {menuItem.item}
    //                   </List.Item>
    //               </Link>
    //           ))}
    //       </List.Root>
    //     </Box>
        
    //   </Stack>
    // </Container>
    <>
      <Flex>
        <Box>
        <Button size='xs' 
        h='calc(100vh - 60px)' w='23px' 
        color='var(--link-fg)' 
        borderRight='1px solid var(--hairline-color)'
        onClick={()=>setIsSidebarOpen(prev=>!prev)}
        >
          {isSidebarOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </Button>
        </Box>
        <Box pt='15px' width='calc(300px - 23px)'>
          <SidebarSearch />
          <Box bg='var(--header-bg)' 
          letterSpacing='0.5px' 
          textTransform='uppercase' 
          fontWeight='400px'
          color='var(--header-color)'
          p='8px'
          mt='5px'
          >Menu</Box>
          <SidebarMenuList data={housekeepingMenuItems} />
        </Box>
      </Flex>
    </>
  )
}

export default Sidebar
