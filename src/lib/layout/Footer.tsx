import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center" color="gray.400">
      <Text fontSize="sm">Quizard&nbsp;-&nbsp;@</Text>
      <Link href="https://twitter.com/DucBuiManh" fontSize="sm">
        DucBuiManh
      </Link>
    </Flex>
  );
};

export default Footer;
