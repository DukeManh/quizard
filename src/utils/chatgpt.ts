import type { CreateChatCompletionResponse } from 'openai';

import type { Message } from '~/types';

const GPT_TURBO = 'gpt-3.5-turbo';
const GPT_API_URL = 'https://api.openai.com/v1/chat/completions';

/** Wait until chat completion is complete and return the first message content */
export const createChatCompletion = async (
  messages: Message[],
  openAIKey?: string
) => {
  const response = await fetch(GPT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIKey || process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: GPT_TURBO,
      messages,
    }),
  });

  if (response.status !== 200) {
    throw new Error('Failed to create chat completion');
  }

  const data = (await response.json()) as CreateChatCompletionResponse;

  return data.choices[0].message?.content;
};

/** Return chat completion ReadableStream response body  */
export const createChatCompletionStream = async (
  messages: Message[],
  openAIKey?: string
) => {
  const response = await fetch(GPT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIKey || process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: GPT_TURBO,
      messages,
      stream: true,
    }),
  });

  if (response.status !== 200) {
    throw new Error('Failed to create chat completion');
  }

  return response.body;
};
