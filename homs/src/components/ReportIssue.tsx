import { Box, Container, Flex, HStack, Input, Text, Textarea } from '@chakra-ui/react'
import { EventType, useForm } from 'react-hook-form'
import { Field } from './ui/field'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Amenity } from '../hooks/useAmenities'
import AmenityList from './AmenityList'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import amenityService, { CanceledError } from '../services/amenity-service'
type Inputs = {
    roomNumber: string
    clientName: string
    amenities: Amenity[]
}

const ReportIssue = () => {
    const [roomNumber, setRoomNumber] = useState<string>('')
    const [clientName, setClientName] = useState<string>('')
    const [amenities, setAmenities] = useState<Amenity[]>([])
    const [error, setError] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        setError('')
        setAmenities([])
        setLoading(true)
        const {request, cancel} = amenityService.getRoomAmenities(roomNumber, clientName)
        request.then(res=>setAmenities(res.data));
        request.catch(err=>{
            if (err instanceof CanceledError) return
            setError(err.message)
        });
        request.finally(()=>setLoading(false))
        return ()=>cancel();
    }, [roomNumber])

    const schema = z.object({
        roomNumber: z.string().min(1, {message: 'Room number is required'}),
        clientName: z.string().min(1, {message: 'Fullname is required'}),
        amenities: z.string().array().optional(),
        message: z.string()

    });


    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>({resolver: zodResolver(schema)});

    const handleChange = (e)=>{
        const roomNumberInput = e.target.value
        if (roomNumberInput.length === 5) {
            setRoomNumber(roomNumberInput);
        }
    }

    // const {amenities, error, isLoading} = useAmenities(roomNumber)
    

  return (
    <form method='post'>
        <Container maxWidth={"700px"} justifyContent='center' bg='white' padding={50} rounded={10}>
            <Text marginBottom={7}>Report Issue</Text>
        <HStack>
            <Field required label='Your fullname:' marginRight={5} >
                <Input paddingX={2} {...register('clientName')}></Input>
            </Field>
            <Field required label='Room #.' >
                <Input paddingX={2} {...register('roomNumber')} onChange={(e)=>handleChange(e)}></Input>
            </Field>
        </HStack>
        <AmenityList amenities={amenities} error={error} />
        <Field label='Message' marginBottom={5}>
            <Textarea {...register('message')}></Textarea>
        </Field>
        <Button type='submit' size='md'>Send</Button>            
        </Container>
    </form>
  )
}

export default ReportIssue
