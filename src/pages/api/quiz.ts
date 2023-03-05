// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Message } from '~/types';
import { createChatCompletion } from '~/utils/chatgpt';
import { getQuizGenerationPrompt } from '~/utils/prompts';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const messages: Message[] = [
    {
      role: 'system',
      content:
        'You are a quiz generator. Generate relevant and fun quizzes for users to test their knowledge.',
    },
    {
      role: 'user',
      content: getQuizGenerationPrompt(5, 'hard', 'Breaking Bad'),
    },
  ];
  const completion = await createChatCompletion(messages);
  res.statusCode = 200;
  res.json({ quiz: completion });
};
