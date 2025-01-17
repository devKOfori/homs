import React, { useEffect, useState } from 'react'
import apiClient from '../api-client'
import { CanceledError } from 'axios'

type UUID = string

export interface Amenity{
    id: UUID,
    name: string,
}

export interface AmenityList {
    amenities: Amenity[]
}

interface Props {
    roomNumber: string
}

const useAmenities = (roomNumber: string) => {
    console.log(`use amenities room #: ${roomNumber}`)
    const [clientName, setClientName] = useState<string>('')
    const [amenities, setAmenities] = useState<AmenityList['amenities']>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)

    const controller = new AbortController();

    useEffect(()=>{
        setLoading(true)
            apiClient.get(
                '/room-amenities/', {
                    params: {
                        'room_number': roomNumber,
                        'client': clientName
                    },
                    signal: controller.signal
                }
            )
            .then(res=>
                {
                    setAmenities(res.data)
                    console.log(`amenities: ${res.data}`)
                }
            ).catch(err=>{
                if (err instanceof CanceledError) return
                setError(err.message)
            }).finally(()=>setLoading(false))
    }, [roomNumber])

  return {amenities, error, isLoading}
}

export default useAmenities
