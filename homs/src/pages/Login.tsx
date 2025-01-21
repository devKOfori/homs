import { Field } from '../components/ui/field'
import { Container, Fieldset, Input, Text } from '@chakra-ui/react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
// import {useAuth} from '../hooks/useAuth'
import { useAuth } from '../contexts/AuthProvider';
import { useState } from 'react'
import authService from '../services/auth-service'
import getUserDashboard from '../dashboards/selectDashboard'
import { useNavigate } from 'react-router-dom'

export interface Inputs{
    username: string;
    password: string
}


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const schema = z.object({
        username: z.string().min(1, {message: 'Username field is required'}),
        password: z.string().min(1, {message: 'Password field is required'})
    })
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>({resolver: zodResolver(schema)})

    const { updateAuth } = useAuth();

    const onSubmit = (data: Inputs)=>{
        const request = authService.login(data);
        request.then(response=>{
            const {refresh, access, department, roles} = response.data
            localStorage.setItem('refresh', JSON.stringify(refresh))
            localStorage.setItem('accessToken', JSON.stringify(access))
            localStorage.setItem('department', department)
            localStorage.setItem('roles', JSON.stringify(roles))
            updateAuth()
            navigate('/dashboard')
        })
        request.catch(error=>setError(error.response.data.detail))
    }



    return (
    <Container marginInline='auto' maxWidth='800px' bg='white' rounded='10px' paddingY='20px'>
        <Container maxWidth='400px' marginInline='auto'>
      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
            <Fieldset.Legend>Login</Fieldset.Legend>
            <Fieldset.ErrorText>Some fields are invalid</Fieldset.ErrorText>
            <Fieldset.Content>
                <Field label='Username' mb='5px' required>
                    <Input paddingX='5px' {...register('username')}></Input>
                    {errors.username && <Text>{errors.username.message}</Text>}
                </Field>
                <Field label='Password' mb='10px' required>
                    <Input type='password' paddingX='5px' {...register('password')}></Input>
                </Field>
            </Fieldset.Content>
        </Fieldset.Root>
        <Button type='submit' disabled={!isValid} bg='black' color='white' padding='20px' mb='10px' mr='10px'>Login</Button>
        <Link to='/reset-password'>Forgot password?</Link>
      </form>
        </Container>
    </Container>
  )
}

export default Login


