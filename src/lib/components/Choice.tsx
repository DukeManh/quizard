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
        sx={{
          ...(!!answer &&
            answer.answer !== choice && {
              opacity: 0.9,
            }),
          transition: 'all 0.05s ease-in-out',
        }}
        bg={
          !answer
            ? colors[choice]
            : answer.answer === choice
            ? 'green.500'
            : choice === answer.choice && !answer.correct
            ? 'gray.500'
            : 'red.500'
        }
        _hover={{
          ...(!answer && {
            filter: 'brightness(0.9)',
          }),
        }}
      >
        <Text as="p" fontSize={{ base: '1.5rem', md: '2rem' }}>
          {content}
        </Text>
      </Center>
    </button>
  );
};

export default ChoiceComponent;
