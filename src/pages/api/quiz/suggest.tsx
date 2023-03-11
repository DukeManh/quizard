import type { NextRequest } from 'next/server';

import { createChatCompletionStream } from '~/utils/chatgpt';
import { getQuizTopicSuggestionPrompt } from '~/utils/prompts';

// Using Edge runtime so to return a ReadableStream response
export const config = {
  runtime: 'edge',
};

export default async (req: NextRequest): Promise<Response> => {
  const { topic, openAIKey } = await req.json();
  if (!topic || typeof topic !== 'string') {
    return new Response('Missing `topic` in request body', {
      status: 400,
    });
  }

  const suggestions = await createChatCompletionStream(
    [
      {
        role: 'user',
        content: getQuizTopicSuggestionPrompt(topic),
      },
    ],
    openAIKey
  );

  return new Response(suggestions);
};
