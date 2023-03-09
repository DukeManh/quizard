import { Center, Text } from '@chakra-ui/react';

import type { Answer, Choice } from '~/types';

const ChoiceComponent = ({
  choice,
  content,
  onSelect,
  answer,
  selected,
}: {
  choice: Choice;
  content: string;
  onSelect: (choice: Choice) => void;
  answer: Answer | undefined;
  selected: Choice | undefined;
}) => {
  const colors = {
    A: '#E74C3C',
    B: '#3498DB',
    C: '#2ECC71',
    D: '#F1C40F',
  };

  const isCorrect = answer && answer.answer === choice;
  const loadingAnswer = selected && !answer;

  const bgColor = !answer
    ? colors[choice]
    : answer.answer === choice
    ? 'green.500'
    : choice === answer.choice && !answer.correct
    ? 'gray.500'
    : 'red.500';

  return (
    <button
      type="button"
      style={{
        display: 'block',
        padding: '0.5rem',
      }}
      disabled={!!selected}
      onClick={() => onSelect(choice)}
    >
      <Center
        minH="15rem"
        sx={{
          ...(loadingAnswer && {
            filter: 'brightness(0.9)',
          }),
          ...(!isCorrect && {
            opacity: 0.9,
          }),
          transition: 'all 0.1s ease-in-out',
        }}
        bg={bgColor}
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
