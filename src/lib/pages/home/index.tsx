import {
  Flex,
  Text,
  Select,
  Button,
  Container,
  Center,
  RadioGroup,
  Radio,
  Stack,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { QuizSettings as Inputs } from '~/types';

const newQuiz = async (data: Inputs) => {
  const quiz = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return quiz.json();
};

const topicSuggestions = [
  'Star Wars',
  'Grammar and punctuation',
  'Mythology',
  'Spanish',
  'Classic rock bands',
  'Cryptocurrency',
  'Board games',
  'Harry Potter',
  'Wildlife',
  'Disney movies',
  'Broadway musicals',
];

const Home = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<number>(0);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // eslint-disable-next-line no-console
    const { quizId } = await newQuiz(data);
    router.push(`/quiz/${quizId}`);
  };

  useEffect(() => {
    const suggest = setInterval(() => {
      setSuggestion((prev) => (prev + 1) % topicSuggestions.length);
    }, 3000);
    return () => clearInterval(suggest);
  }, []);

  const difficulty = ['easy', 'medium', 'hard'];

  const numberOfQuestions = [5, 10, 15, 20];

  return (
    <Container minH="80vh">
      <NextSeo title="Home" />
      <Text
        fontSize="4xl"
        sx={{
          textAlign: 'center',
        }}
        as="h1"
      >
        Put your knowledge to the test
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text>I&lsquo;d like be quizzed on:</Text>
        <Flex direction="column" justifyContent="center" gap={4}>
          <Input
            placeholder={topicSuggestions[suggestion]}
            aria-label="quiz topic"
            {...register('topic', { required: true })}
            maxLength={50}
          />
          <RadioGroup defaultValue={difficulty[1]}>
            <Stack direction="row">
              {difficulty.map((option) => (
                <Radio
                  key={option}
                  value={option}
                  {...register('difficulty', { required: true })}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Select
            placeholder="Number of questions"
            aria-label="Number of questions"
            {...register('numQuestions', { required: true })}
            defaultValue={numberOfQuestions[0]}
          >
            {numberOfQuestions.map((option) => (
              <option key={option} value={option}>
                # of questions: {option}
              </option>
            ))}
          </Select>
          <Center>
            <Button type="submit">Enter</Button>
          </Center>
        </Flex>
      </form>
    </Container>
  );
};

export default Home;
