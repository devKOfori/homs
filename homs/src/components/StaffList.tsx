import React from 'react'

export interface Staff {
    id: string;
    full_name: string;
    user: {
        username: string;
        first_name: string;
        last_name: string;
    };
    department: string;
    roles: [
        {
            id: string;
            role: string;
            is_active: boolean;
        }
    ];
    birthdate: Date;
    photo: string;
    phone_number: string;
    email: string;
    residential_address: string;
    gender: string;
}

interface Props {
    data: Staff[];
    heading: string;
}

const StaffList = ({data, heading}) => {
    
  return (
    <div>
      
    </div>
  )
}

export default StaffList
