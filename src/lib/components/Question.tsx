import { Flex, Text } from '@chakra-ui/react';

import type { CheckAnswerResponse, Question } from '~/types';
import { Choice } from '~/types';

import ChoiceComponent from './Choice';

const QuestionComponent = ({
  question,
  onSelect,
  answer,
}: {
  question: Question;
  onSelect: (choice: Choice) => void;
  answer: CheckAnswerResponse | undefined;
}) => {
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
            onSelect={onSelect}
            answer={answer}
          />
        ))}
      </Flex>
    </>
  );
};

export default QuestionComponent;
