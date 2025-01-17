import { Container, Flex, Stack, Text } from '@chakra-ui/react'
import ReportIssue from '../components/ReportIssue'
import HomeAction from '../components/HomeAction'
import { FaPhone } from 'react-icons/fa'
import { BsClipboardFill } from 'react-icons/bs'

const Home = () => {
  return (
    <Container maxW={"10xl"}  bg={"white"} marginInline={"auto"} color={"black"} borderRadius={"5px"} textAlign={"center"} padding={"30px"}>
        <Text marginBottom={"50px"}>Home</Text>
        {/* <Flex
        // flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4} // Add space between components
        > */}
        {/* <Container> */}
        <Stack>
            {/* <ReportIssue /> */}
        <HomeAction action={"Report An Issue"} icon={<FaPhone />} link={'/report-issue'}/>
        <HomeAction action={"Request Service"} icon={<BsClipboardFill />} />
        </Stack>
        {/* </Container> */}
        {/* </Flex> */}
        
        <Stack textAlign={"left"} marginTop={"50px"}>
            <Text>Call FrontDesk</Text>
            <Text>0554474062</Text>
        </Stack>
    </Container>
  )
}

export default Home
