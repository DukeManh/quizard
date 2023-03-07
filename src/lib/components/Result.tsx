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
  const percentage = (correct / answers.length) * 100;
  const rating = percentage < 50 ? 0 : percentage < 70 ? 1 : 2;
  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="6xl">
        {rating === 0 ? '😢' : rating === 1 ? '😀' : '🎉'}
      </Text>

      <Heading as="h2" size="xl" mt={6} mb={2}>
        &quot;{quiz.topic}&quot; | {quiz.difficulty} | {quiz.numQuestions}
      </Heading>

      <Text color="gray.500" fontSize="lg">
        You answered {correct} out of {answers.length} correctly.
      </Text>
      <Accordion allowMultiple defaultIndex={[]}>
        {quiz.questions.map((q) => {
          const answer = answers.find((a) => a.questionNumber === q.number);
          return (
            <AccordionItem key={q.number}>
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
