import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { Heading } from '@chakra-ui/react'
import HouseKeepingTasksList from '../components/HouseKeepingTasksList'

const TaskUpdates = () => {
  return (
    <DashboardLayout>
        <Heading fontWeight={300}>Task Updates</Heading>
        <HouseKeepingTasksList showFilters={true} displayManagerColumns={true}/>
    </DashboardLayout>
  )
}

export default TaskUpdates
