import React, {useState} from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import ActionPageHeader from '../components/ActionPageHeader'
import CheckInList from '../components/CheckInList'

const CheckIn = () => {
  return (
    <DashboardLayout>
        <ActionPageHeader
          heading="Check In"
          table="checkin"
        />
        <CheckInList />
    </DashboardLayout>
  )
}

export default CheckIn
