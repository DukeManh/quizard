import {
  Container,
  Flex,
  Box,
  Image,
  Spacer,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const logoColor = useColorModeValue('#51abcb', '#82c1f5');
  return (
    <Container maxW="4xl" h="3.5rem" my={2}>
      <Flex
        borderBottom="1px"
        borderColor="gray.600"
        alignItems="center"
        h="100%"
        gap={2}
      >
        <Box>
          <Image src="/quizard.svg" width="2rem" alt="quizard logo" />
        </Box>
        <Link
          as={NextLink}
          fontSize="2xl"
          fontWeight="bold"
          color={logoColor}
          fontFamily="'Rampart One', cursive;"
          href="/"
          _hover={{ textDecoration: 'none' }}
        >
          quizard
        </Link>
        <Spacer />
        {/* <Text as="p" fontSize="12px" fontWeight="bold" color="gray.500">
          Powered by chatGPT
        </Text> */}
        <IconButton
          aria-label="theme toggle"
          icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Container>
  );
};

export default Header;
