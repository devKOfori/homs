import React from 'react'
import { Field } from './ui/field'
import { Box, Input } from '@chakra-ui/react'

const SidebarSearch = () => {
  return (
    <Box>
    <Field display={{ base: 'none', md: 'block' }}>
        <Input
            type='text'
            placeholder='Search...'
            w='100%'
            h='25px'
            rounded='0'
            borderColor='var(--hairline-color)'
            px='5px'
        />
    </Field>
    </Box>
  )
}

export default SidebarSearch
