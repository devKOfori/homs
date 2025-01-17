import { Box, Container, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';

interface Props {
    action: string;
    icon: React.ComponentType<IconBaseProps>;
    link: string
}

const HomeAction = ({action, icon, link}: Props) => {
  return (
    <Box border={"1px solid red"} marginX={"20px"} padding={"5px"}>
        <HStack justifyContent="center" alignItems="center" spacing={2}>
            <Link to={link}>
            <Text textAlign={"center"}>{action}</Text>
            </Link>
           {icon}
        </HStack>
    </Box>
  )
}

export default HomeAction
