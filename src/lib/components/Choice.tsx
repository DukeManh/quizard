import { Center, Text } from '@chakra-ui/react';

import type { Check, Choice } from '~/types';

const ChoiceComponent = ({
  choice,
  content,
  onSelect,
  answer,
}: {
  choice: Choice;
  content: string;
  onSelect: (choice: Choice) => void;
  answer: Check | undefined;
}) => {
  const colors = {
    A: '#E74C3C',
    B: '#3498DB',
    C: '#2ECC71',
    D: '#F1C40F',
  };

  return (
    <button
      type="button"
      style={{
        display: 'block',
        flexBasis: 'calc(100% / 2)',
        padding: '0.5rem',
      }}
      disabled={!!answer}
      onClick={() => onSelect(choice)}
    >
      <Center
        minH="15rem"
        bg={
          !answer
            ? colors[choice]
            : answer.answer === choice
            ? 'green.500'
            : 'red.500'
        }
        _hover={{
          filter: 'brightness(0.9)',
          transition: 'all 0.15s ease-in-out',
        }}
      >
        <Text as="p" fontSize="4xl">
          {content}
        </Text>
      </Center>
    </button>
  );
};

export default ChoiceComponent;
