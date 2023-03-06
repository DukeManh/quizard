import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

import type { Check, Quiz } from '~/types';

const Result = ({ answers, quiz }: { answers: Check[]; quiz: Quiz }) => {
  const correct = answers.filter((a) => a.correct).length;
  const rating = correct < 5 ? 0 : correct < 7 ? 1 : 2;
  return (
    <Box textAlign="center" py={10} px={6}>
      {rating === 0 ? (
        <Text fontSize="7xl">😢</Text>
      ) : correct === 1 ? (
        <Text fontSize="7xl">😐</Text>
      ) : (
        <Text fontSize="7xl">🎉</Text>
      )}

      <Heading as="h2" size="xl" mt={6} mb={2}>
        {quiz.topic} | {quiz.difficulty} | {quiz.numQuestions}
      </Heading>

      <Text color="gray.500" fontSize="lg">
        You answered {correct} out of {answers.length} correctly.
      </Text>
      <Accordion allowMultiple defaultIndex={[]}>
        {quiz.questions.map((q) => {
          const answer = answers.find((a) => a.questionNumber === q.number);
          return (
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text>
                    {answer?.correct ? '✅' : '❌'}
                    {'    '}
                    {q.question}
                  </Text>
                </Box>
              </AccordionButton>
              <AccordionPanel textAlign="left">
                <Text>You answered: {answer?.choice}</Text>
                <Text>Correct: {answer?.answer}</Text>
                <Text>{answer?.explanation}</Text>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default Result;
