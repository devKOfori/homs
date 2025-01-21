import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { housekeepingMenu } from '../Menu'

const Sidebar = () => {

  return (
    <>
      <Stack>
        <Text>Homs</Text>
        <Text>Dashboard</Text>
        {
            housekeepingMenu.map((menuItem, index)=>(<Text key={index}>{menuItem}</Text>))
        }
      </Stack>
    </>
  )
}

export default Sidebar
