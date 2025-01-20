import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import FrontdeskDashboard from '../dashboards/FrontdeskDashboard';
import HousekeepingDashboard from '../dashboards/HousekeepingDashboard';

const Dashboard = () => {
    const { department } = useAuth();
    // console.log(`Department: ${department}`)
    switch (department) {
        case 'Frontdesk':
            return <FrontdeskDashboard />
    
        case 'Housekeeping':
            return <HousekeepingDashboard />
    }
}

export default Dashboard
