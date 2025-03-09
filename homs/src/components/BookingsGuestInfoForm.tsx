import { Flex, NativeSelect } from '@chakra-ui/react'
import React from 'react'
import { Field } from './ui/field'

const BookingsGuestInfoForm = () => {
  return (
    <Flex justifyContent='space-between'>
        <Field label='Title'>
            <NativeSelect.Root>
                <NativeSelect.Field placeholder='Select title'>
                    <option value='mr'>Mr</option>
                    <option value='mrs'>Mrs</option>
                    <option value='miss'>Miss</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
            </NativeSelect.Root>
        </Field>
    </Flex>
  )
}

export default BookingsGuestInfoForm
