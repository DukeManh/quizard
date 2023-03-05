import { Flex, Text } from '@chakra-ui/react';

import type { Question } from '~/types';
import { Choice } from '~/types';

import ChoiceComponent from './Choice';

const QuestionComponent = ({ question }: { question: Question }) => {
  return (
    <>
      <Text as="h1" fontSize="4xl">
        {question.question}
      </Text>
      <Flex direction="row" wrap="wrap">
        {[Choice.A, Choice.B, Choice.C, Choice.D].map((choice) => (
          <ChoiceComponent
            key={choice.toString()}
            choice={choice}
            content={question.choices[choice]}
          />
        ))}
      </Flex>
    </>
  );
};

export default QuestionComponent;
