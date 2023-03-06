import { Button, Container, Progress, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import QuestionComponent from '~/lib/components/Question';
import type { Choice, Quiz } from '~/types';

const QuizPage = () => {
  const router = useRouter();
  const { id, q: questionNum } = router.query;
  const { data: quiz } = useSWR<Quiz>(`/api/quiz/${id}`);
  const isQuizLoaded = quiz && quiz.loaded;
  const [answer, setAnswer] = useState<Choice>();
  const [selectedAnswer, setSelectedAnswer] = useState<Choice>();

  const startQuiz = () => {
    if (!questionNum && isQuizLoaded) {
      router.push(`/quiz/${id}?q=0`, undefined, { shallow: true });
    }
  };

  const question =
    questionNum && isQuizLoaded
      ? quiz.questions.find((q) => q.number === questionNum)
      : undefined;

  const onSelect = (choice: Choice) => {
    setAnswer(question!.answer);
    setSelectedAnswer(choice);
  };

  const nextQuestion = () => {
    setAnswer(undefined);
    setSelectedAnswer(undefined);
    if (questionNum && isQuizLoaded) {
      const nextQuestionNum = Number(questionNum) + 1;
      if (nextQuestionNum < quiz.questions.length) {
        router.push(`/quiz/${id}?q=${nextQuestionNum}`, undefined, {
          shallow: true,
        });
      }
      //  else {
      //   router.push(`/quiz/${id}/results`, undefined, { shallow: true });
      // }
    }
  };

  if (questionNum && isQuizLoaded && !question) {
    return null;
  }

  return (
    <Container maxW="5xl" minH="80vh">
      {questionNum && isQuizLoaded ? (
        <>
          <QuestionComponent
            onSelect={onSelect}
            question={question!}
            answer={answer}
          />
          {selectedAnswer && (
            <Button type="button" onClick={nextQuestion}>
              Next
            </Button>
          )}
        </>
      ) : (
        <>
          {!isQuizLoaded && (
            <>
              <Text>Preparing your quiz...</Text>
              <Progress isIndeterminate />
            </>
          )}
          <Button
            isDisabled={!isQuizLoaded}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
              boxShadow: 'none',
            }}
            onClick={startQuiz}
          >
            Start
          </Button>
        </>
      )}
    </Container>
  );
};

export default QuizPage;
