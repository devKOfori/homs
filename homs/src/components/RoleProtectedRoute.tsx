import { useAuth } from '../contexts/AuthProvider'
import { Navigate } from "react-router-dom"

const RoleProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken')
    const userDepartment = localStorage.getItem('department')

    
    const { auth: {department} } = useAuth();

    if (!token) {
        return <Navigate to='/login' />
    }
    return userDepartment===department ? children : <Navigate to='/login' />
}

export default RoleProtectedRoute
