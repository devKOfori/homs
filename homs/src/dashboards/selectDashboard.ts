import FrontdeskDashboard from './FrontdeskDashboard'
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const getUserDashboard = (department: string)=>{
    switch (department) {
        case 'Frontdesk':
            return FrontdeskDashboard
    
        default:
            break;
    }
}

export default getUserDashboard