// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { QuizSettings, Message, Question } from '../../../types/index';
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

  createChatCompletion(messages, openAIKey)
    .then((completion) => {
      try {
        const questions = JSON.parse(completion!) as Question[];
        const dbQuestions = questions.map((q, index) => {
          return {
            ...q,
            number: index.toString(),
            quizId: newQuiz,
          };
        });

        Quizzes.updateOne(newQuiz, {
          questions: dbQuestions,
          loaded: true,
        });
      } catch (err) {
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason: 'Failed to parse quiz',
        });
      }
    })
    .catch(() => {
      if (openAIKey) {
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason: 'There was a problem generate quiz with your openAI key',
        });
      } else {
        Quizzes.updateOne(newQuiz, {
          failed: true,
          reason:
            'There was a problem generate quiz, please try again with your openAI key',
        });
      }
    });

  res.status(200).json({
    quizId: newQuiz,
  });
};
