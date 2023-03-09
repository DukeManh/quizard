import { Grid, Text } from '@chakra-ui/react';

import type { Answer, Question } from '~/types';
import { Choice } from '~/types';

import ChoiceComponent from './Choice';

const QuestionComponent = ({
  question,
  onSelect,
  answer,
  selected,
}: {
  question: Question;
  onSelect: (choice: Choice) => void;
  answer: Answer | undefined;
  selected: Choice | undefined;
}) => {
  const { A, B, C, D } = Choice;

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
        {[A, B, C, D].map((choice) => (
          <ChoiceComponent
            key={choice.toString()}
            choice={choice}
            content={question.choices[choice]}
            onSelect={onSelect}
            answer={answer}
            selected={selected}
          />
        ))}
      </Grid>
    </>
  );
};

export default QuestionComponent;
