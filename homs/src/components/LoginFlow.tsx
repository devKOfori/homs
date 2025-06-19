import { Container } from '@chakra-ui/react'
import React from 'react'

interface Props {
    children: React.ReactNode
    }

const LoginFlow = ({children}: Props) => {
  return (
    <Container
      marginInline="auto"
      maxWidth="100%"
      rounded="10px"
      paddingY="20px"
      bg={"#FBF7EB"}
      height={"100vh"}
      alignItems={"center"}
      display="flex"
    >
      <Container
        maxWidth={{ base: "300px", md: "400px" }}
        marginInline="auto"
        bg="white"
        padding="20px"
        rounded="10px"
        boxShadow="0 0 10px rgba(0,0,0,0.1)"
      >
        {children}
      </Container>
    </Container>
  );
}

export default LoginFlow
