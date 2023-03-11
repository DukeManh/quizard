import { ExternalLinkIcon } from '@chakra-ui/icons';
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
  Spinner,
  Box,
  Link,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import useLocalStorage from '~/lib/hooks/use-local-storage';
import type { QuizSettings } from '~/types';

interface Inputs extends QuizSettings {
  openAIKey?: string;
}

const createNewQuiz = async (data: Inputs) => {
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
  'Countries and Capitals',
  'System Design interview',
  'MacOS shortcuts',
  "Who's smarter than a 5th grader?",
  'Spanish vocabulary',
  'Cryptocurrency',
  'Harry Potter trivia',
  'Machine learning interview',
  'General Knowledge',
];

const Home = () => {
  const [openAIKey, saveOpenAIKey] = useLocalStorage('openAIKey');
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      openAIKey: openAIKey || '',
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [placeholder, setPlaceholder] = useState('');
  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    createNewQuiz(data)
      .then(({ quizId }) => {
        if (quizId) {
          router.push(`/quiz/${quizId}`);
        }
      })
      .catch((err) => {
        setError('Unable to start a new quiz. Please try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let typing: NodeJS.Timeout;
    let newSuggestion: NodeJS.Timeout;
    const delay = 70;
    const timeout = 1000;

    const updatePlaceholder = (currentIndex: number) => {
      setPlaceholder('');
      const currentTopic = topicSuggestions[currentIndex];
      let currentChar = 0;
      typing = setInterval(() => {
        setPlaceholder(currentTopic.substring(0, currentChar + 1));
        currentChar += 1;
        if (currentChar > currentTopic.length) {
          clearInterval(typing);
          newSuggestion = setTimeout(() => {
            updatePlaceholder((currentIndex + 1) % topicSuggestions.length);
          }, timeout);
        }
      }, delay);
    };

    updatePlaceholder(0);

    return () => {
      clearInterval(typing);
      clearTimeout(newSuggestion);
    };
  }, []);

  const difficulty = ['easy', 'medium', 'hard'];

  const numberOfQuestions = [5, 10, 15, 20];

  return (
    <Container minH="80vh" paddingTop={2}>
      <NextSeo title="Home" />
      <Text
        fontSize={{ base: '2xl', md: '4xl' }}
        marginBottom={2}
        sx={{
          textAlign: 'left',
        }}
        as="h1"
      >
        Put your knowledge to the test
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text>I&lsquo;d like be quizzed on:</Text>
        <Flex direction="column" justifyContent="center" gap={4}>
          <Input
            aria-label="quiz topic"
            placeholder={placeholder}
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
              <option
                key={option}
                value={option}
                disabled={option > 10 && !watch('openAIKey')}
              >
                # of questions: {option}
              </option>
            ))}
          </Select>

          <Box>
            <Text>
              Use your &nbsp;
              <Link
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                isExternal
              >
                openAI key
                <ExternalLinkIcon mx="1px" />
              </Link>
              &nbsp; to get more questions
            </Text>
            <InputGroup>
              <Input
                aria-label="openAI key"
                placeholder="sk-••••••••••••••••••••••••••••••••••••••••••••••••"
                type={show ? 'text' : 'password'}
                {...register('openAIKey')}
                onChange={(e) => {
                  saveOpenAIKey(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Center flexDir="column">
            <Button type="submit" isDisabled={loading || !!error}>
              <Center gap={1}>
                <Text>Enter</Text>
                {loading && <Spinner size="sm" />}
              </Center>
            </Button>
            <Text color={error ? 'red.500' : 'transparent'}>{error}</Text>
          </Center>
        </Flex>
      </form>
    </Container>
  );
};

export default Home;
