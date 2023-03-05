import { Container, Progress, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import QuestionComponent from '~/lib/components/Question';
import type { Quiz } from '~/types';

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: quiz } = useSWR<Quiz>(`/api/quiz/${id}`);

  return (
    <Container maxW="5xl" minH="80vh">
      {quiz && quiz.loaded ? (
        <>
          {quiz.questions.map((question) => (
            <QuestionComponent key={question.number} question={question} />
          ))}
        </>
      ) : (
        <>
          <Text>Loading...</Text>
          <Progress isIndeterminate />
        </>
      )}
    </Container>
  );
};

export default QuizPage;
