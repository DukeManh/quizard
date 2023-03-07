import { Grid, Text } from '@chakra-ui/react';

import type { Check, Question } from '~/types';
import { Choice } from '~/types';

import ChoiceComponent from './Choice';

const QuestionComponent = ({
  question,
  onSelect,
  answer,
}: {
  question: Question;
  onSelect: (choice: Choice) => void;
  answer: Check | undefined;
}) => {
  return (
    <>
      <Text
        as="h1"
        fontSize={{
          base: '2xl',
          md: '3xl',
        }}
        marginBottom={2}
      >
        {question.question}
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={1}>
        {[Choice.A, Choice.B, Choice.C, Choice.D].map((choice) => (
          <ChoiceComponent
            key={choice.toString()}
            choice={choice}
            content={question.choices[choice]}
            onSelect={onSelect}
            answer={answer}
          />
        ))}
      </Grid>
    </>
  );
};

export default QuestionComponent;
