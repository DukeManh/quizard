import { Flex } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
    </Flex>
  );
};

export default Home;
