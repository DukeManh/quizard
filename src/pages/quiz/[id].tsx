import { Button, Container, Progress, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import QuestionComponent from '~/lib/components/Question';
import type { CheckAnswerResponse, Choice, Quiz } from '~/types';

const QuizPage = () => {
  const router = useRouter();
  const { id, q: questionNum } = router.query;
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    // eslint-disable-next-line prefer-const
    interval = setInterval(() => {
      if (!quiz || !quiz.loaded) {
        fetch(`/api/quiz/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setQuiz(data);
          });
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [id, quiz]);

  const isQuizLoaded = quiz && quiz.loaded;
  const [answer, setAnswer] = useState<CheckAnswerResponse>();
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
    setSelectedAnswer(choice);
    fetch(`/api/quiz/${id}/question/${question?.number}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ choice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnswer(data);
      });
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
