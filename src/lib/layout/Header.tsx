import { Text, Container, Flex, Box, Image, Spacer } from '@chakra-ui/react';

const Header = () => {
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
        <Text
          as="p"
          fontSize="2xl"
          fontWeight="bold"
          color="#93CDFD"
          fontFamily="'Rampart One', cursive;"
        >
          quizard
        </Text>
        <Spacer />
        <Text as="p" fontSize="12px" fontWeight="bold" color="gray.500">
          Powered by chatGPT
        </Text>
      </Flex>
    </Container>
  );
};

export default Header;
