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
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { QuizSettings as Inputs } from '~/types';

const getQuiz = async (data: Inputs) => {
  const searchResponse = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-console
  console.log(await searchResponse.json());
};

const Home = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // eslint-disable-next-line no-console
    getQuiz(data);
  };

  // Workaround to make NextJS pre-compile /api/quiz/[id] endpoint
  useEffect(() => {
    fetch('/api/quiz/0');
  }, []);

  const topics = [
    'Breaking Bad',
    'Geography',
    'French language',
    'Harry Potter',
    'Ancient Rome',
  ];

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
        <Text>I would like to test my knowledge on:</Text>
        <Flex direction="column" justifyContent="center" gap={4}>
          <Select
            placeholder="Select topic"
            aria-label="quiz topic"
            defaultValue={topics[1]}
            {...register('topic')}
          >
            {topics.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <RadioGroup defaultValue={difficulty[1]}>
            <Stack direction="row">
              {difficulty.map((option) => (
                <Radio key={option} value={option} {...register('difficulty')}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Select
            placeholder="Number of questions"
            aria-label="Number of questions"
            defaultValue={numberOfQuestions[0]}
            {...register('numQuestions')}
          >
            {numberOfQuestions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Center>
            <Button type="submit">Start</Button>
          </Center>
        </Flex>
      </form>
    </Container>
  );
};

export default Home;
