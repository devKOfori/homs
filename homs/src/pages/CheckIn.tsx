import React, {useState} from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import ActionPageHeader from '../components/ActionPageHeader'
import CheckInList from '../components/CheckInList'

const CheckIn = () => {
  return (
    <>
        <ActionPageHeader
          heading="Check In"
          table="checkin"
        />
        <CheckInList />
    </>
  )
}

export default CheckIn
