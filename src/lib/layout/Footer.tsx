import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center" color="gray.400">
      <Link href="https://github.com/DukeManh/quizard" fontSize="sm">
        Quizard
      </Link>
      <Text fontSize="sm">&nbsp;-&nbsp;@</Text>
      <Link href="https://twitter.com/DucBuiManh" fontSize="sm">
        DucBuiManh
      </Link>
    </Flex>
  );
};

export default Footer;
