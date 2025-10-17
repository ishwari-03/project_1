import { Button, Flex, HStack, useColorMode} from '@chakra-ui/react';
import{Container, Text} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
    const{ colorMode, toggleColorMode }= useColorMode();
  return <Container maxh={'1140px'} px={4} >
    <Flex
      h={16}
      alignItems={"center"}
      justifyContent={"space-between"}
        flexDir={{base:"column",sm:"row"}}
        >
           <Text
					fontSize={{  base: "2xl", sm: "3xl", md: "4xl" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={{ base: "center", sm: "left" }}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

<HStack spacing={2} alignItems={"center"}>
    <Link to="/create">
    <Button>
        <CiSquarePlus />
    </Button>
    </Link>
    <Button onClick={toggleColorMode}>
        {colorMode==="light" ?<IoMoon /> : <LuSun size='20' />}
    </Button>

</HStack>
        </Flex>
      


  </Container>
};

export default Navbar