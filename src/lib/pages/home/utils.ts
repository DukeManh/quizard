import type { QuizSettings, Topic } from '~/types';

export interface Inputs extends QuizSettings {
  openAIKey?: string;
}

export const createNewQuiz = async (data: Inputs) => {
  const quiz = await fetch('/api/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return quiz.json();
};

export const getTopicSuggestion = async (topic: Topic) => {
  const response = await fetch(`/api/quiz/suggest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });
  return response.body;
};

export const topicSuggestions = [
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

export const readStream = async (
  stream: ReadableStream,
  onData: (value: string) => void
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  async function read() {
    const { done, value } = await reader.read();
    if (!value) {
      return;
    }
    onData(decoder.decode(value));

    if (!done) {
      read();
    }
  }
  return read();
};
