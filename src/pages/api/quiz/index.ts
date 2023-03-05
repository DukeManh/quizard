// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { QuizSettings, Message } from '../../../types/index';
import { createChatCompletion } from '~/utils/chatgpt';
import { getQuizGenerationPrompt } from '~/utils/prompts';

const validateRequest = (req: NextApiRequest) => {
  const { difficulty, numQuestions, topic } = req.body;
  return (
    (difficulty &&
      numQuestions &&
      topic &&
      topic.trim().length &&
      ['easy', 'medium', 'hard'].includes(difficulty)) ||
    !Number.isNaN(Number.parseInt(numQuestions, 10))
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
      },
    });
  }

  const { difficulty, numQuestions, topic } = req.body as QuizSettings;

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

  const completion = await createChatCompletion(messages);

  res.status(200).json({
    quiz: completion,
  });
};
