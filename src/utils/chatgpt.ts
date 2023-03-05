import { Configuration, OpenAIApi } from 'openai';

import type { Message } from '~/types';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const GPT_TURBO = 'gpt-3.5-turbo';

export const createChatCompletion = async (
  messages: Message[],
  model = GPT_TURBO
) => {
  const completion = await openai.createChatCompletion({
    model,
    messages,
  });
  return completion.data.choices[0].message?.content;
};
