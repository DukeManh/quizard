import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState, useEffect, useRef } from 'react';

import {
  getQuiz,
  checkAnswer,
  formatTime,
  getTimeSince,
} from '../../lib/pages/quiz/utils';
import BlinkingDots from '~/lib/components/BlinkingDots';
import QuestionComponent from '~/lib/components/Question';
import Result from '~/lib/components/Result';
import type { Answer, Choice, Quiz } from '~/types';

const QuizPage = () => {
  const router = useRouter();
  const { id, q: questionNum } = router.query;
  const [quiz, setQuiz] = useState<Quiz>();
  const isQuizLoaded = quiz && quiz.loaded === true;
  const isQuizFailed = quiz && quiz.failed === true;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [ended, setEnded] = useState(false);
  const [selected, setSelected] = useState<Choice>();
  const [timeSinceQuizCreated, setTimeSinceQuizCreated] = useState<number>();
  const updateTimeInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (updateTimeInterval.current) {
        clearInterval(updateTimeInterval.current);
      }
    };
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!quiz || (!quiz.loaded && !quiz.failed)) {
        getQuiz(id as string).then((data) => {
          router.push(`/quiz/${id}`, undefined, {
            shallow: true,
          });

          if (!quiz) {
            setTimeSinceQuizCreated(getTimeSince(data.created_date));
            updateTimeInterval.current = setInterval(() => {
              setTimeSinceQuizCreated((prev) => prev! + 1);
            }, 1000);
          }

          setQuiz((prev) => ({
            ...prev,
            ...data,
          }));
        });
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, quiz]);

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
    if (selected || !question) {
      return;
    }

    setSelected(choice);

    checkAnswer(id as string, question.number, choice).then((data) => {
      setAnswers([...answers, data]);
    });
  };

  const nextQuestion = () => {
    if (!questionNum || !isQuizLoaded) {
      return;
    }

    setSelected(undefined);

    const nextQuestionNum = Number(questionNum) + 1;
    if (nextQuestionNum < quiz.questions.length) {
      router.push(`/quiz/${id}?q=${nextQuestionNum}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/quiz/${id}?completed=true`, undefined, {
        shallow: true,
      });
      setEnded(true);
    }
  };

  if (questionNum && isQuizLoaded && !question) {
    return null;
  }

  if (ended)
    return (
      <Container maxW="5xl" minHeight="80vh">
        <Result answers={answers} quiz={quiz!} />
      </Container>
    );

  const answer = answers.find((a) => a.questionNumber === question?.number);

  return (
    <Container maxW="5xl" minHeight="80vh">
      <NextSeo title={quiz?.topic} />
      {questionNum && isQuizLoaded ? (
        <>
          <QuestionComponent
            onSelect={onSelect}
            question={question!}
            answer={answer}
            selected={selected}
          />
          {answer && (
            <Box marginTop={2}>
              <Text fontSize="md" color="gray.400">
                {answer.explanation}
              </Text>
              <Flex justify="end">
                <Button size="lg" type="button" onClick={nextQuestion}>
                  Next
                </Button>
              </Flex>
            </Box>
          )}
        </>
      ) : (
        <Flex
          minH="100%"
          justify="center"
          align="center"
          direction="column"
          padding={14}
          gap={4}
        >
          <Button
            isDisabled={!isQuizLoaded || isQuizFailed}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
              boxShadow: 'none',
            }}
            onClick={startQuiz}
            size="lg"
          >
            <Center gap={2}>
              <Text>Start</Text>
              {!isQuizLoaded && !quiz?.failed && <Spinner size="sm" />}
            </Center>
            <Center />
          </Button>
          <Text>
            {isQuizFailed ? (
              <Text color="red.500">{quiz.reason}</Text>
            ) : !isQuizLoaded ? (
              <>
                <span>Preparing your quiz </span>
                {timeSinceQuizCreated && (
                  <span>
                    , started {formatTime(timeSinceQuizCreated)} ago &nbsp;
                  </span>
                )}
                <BlinkingDots />
              </>
            ) : null}
          </Text>
        </Flex>
      )}
    </Container>
  );
};
export default QuizPage;
