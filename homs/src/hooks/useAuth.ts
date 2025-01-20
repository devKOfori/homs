import { useEffect, useState } from "react";
import apiClient from "../api-client"
import { CanceledError } from "axios";
import { Inputs } from "../pages/Login";


interface Props {
    username: string,
    password: string
}

const useAuth = (data: Props) => {
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        const controller = new AbortController();
        setLoading(true)
        apiClient.post('/token/', data, {
            signal: controller.signal
        })
        .then(res=>{
            // console.log(`res: ${res}`)
            setUserInfo(res.data)
        })
        .catch(err=>{
            if (err instanceof CanceledError) return
            // console.log(`Err: ${err}`)
            setError(err.message)
        })
        .finally(()=>setLoading(false))
        return ()=>controller.abort();
    }, [])
    return { userInfo, error, isLoading }
}

export default useAuth