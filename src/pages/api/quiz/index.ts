import type { NextApiRequest, NextApiResponse } from 'next';

import type { GeneratedQuestion, QuizSettings, Message, Choice } from '~/types';
import { createChatCompletion } from '~/utils/chatgpt';
import { Quizzes } from '~/utils/db';
import { getQuizGenerationPrompt } from '~/utils/prompts';

const validateRequest = (req: NextApiRequest) => {
  const { difficulty, numQuestions, topic, openAIKey } = req.body;
  return (
    (difficulty &&
      numQuestions &&
      topic &&
      topic.trim().length &&
      ['easy', 'medium', 'hard'].includes(difficulty)) ||
    (!Number.isNaN(Number.parseInt(numQuestions, 10)) &&
      typeof openAIKey &&
      openAIKey !== 'string')
  );
};

// shuffle the choices and update the correct answer
export const shuffleChoices = (
  question: GeneratedQuestion
): GeneratedQuestion => {
  const choices = { ...question.choices };
  let { answer } = question;

  for (let i = 0; i < 4; i += 1) {
    const beingSwapped = String.fromCharCode(i + 65) as Choice;
    const swapTo = String.fromCharCode(
      Math.floor(Math.random() * 4) + 65
    ) as Choice;

    const temp = choices[beingSwapped];

    if (answer === beingSwapped) {
      answer = swapTo;
    } else if (answer === swapTo) {
      answer = beingSwapped;
    }

    choices[beingSwapped] = choices[swapTo];
    choices[swapTo] = temp;
  }
  return {
    ...question,
    choices,
    answer,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.redirect('/404');
    return;
  }

  if (!validateRequest(req)) {
    res.status(400).json({
      error: 'Invalid request',
      received: req.body,
      expected: {
        difficulty: 'easy | medium | hard',
        numQuestions: 'number',
        topic: 'string',
        openAIKey: '?string',
      },
    });
  }

  const { difficulty, numQuestions, topic } = req.body as QuizSettings;
  const { openAIKey } = req.body;

  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are a quiz generator. Generate relevant and fun quizzes for users to test their knowledge.',
    },
    {
      role: 'user',
      content: getQuizGenerationPrompt(numQuestions, difficulty, topic),
    },
  ];

  const newQuiz = await Quizzes.insert({
    difficulty,
    numQuestions,
    topic,
  });

  let completionText = '';
  createChatCompletion(messages, openAIKey)
    .then((completion) => {
      try {
        completionText = completion!;
        const generatedQuestions = JSON.parse(
          completion!
        ) as GeneratedQuestion[];

        const questions = generatedQuestions
          .map((q) => shuffleChoices(q))
          .map((q, index) => {
            return {
              ...q,
              number: index.toString(),
              quizId: newQuiz,
            };
          });

        Quizzes.updateOne(newQuiz, {
          questions,
          loaded: true,
        });
      } catch (err) {
        console.error('Failed to parse quiz', completionText, err);
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason: 'Failed to parse quiz, ensure the quiz topic is valid',
        });
      }
    })
    .catch((err) => {
      console.error('Failed to create quiz', err);
      if (openAIKey) {
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason: 'There was a problem generating quiz with your openAI key',
        });
      } else {
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason:
            'There was a problem generating quiz, please try again with your openAI key',
        });
      }
    });

  res.status(200).json({
    quizId: newQuiz,
  });
};
