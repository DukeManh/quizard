import type { ChatCompletionRequestMessage } from 'openai';

export type NumQuestion = 5 | 10 | 15 | 20;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Topic = string;

export type Message = ChatCompletionRequestMessage;

export type QuizSettings = {
  topic: Topic;
  difficulty: Difficulty;
  numQuestions: NumQuestion;
};

export enum Choice {
  A,
  B,
  C,
  D,
}

export interface Question {
  question: string;
  choices: Record<Choice, string>;
  answer: Choice;
  explanation: string;
}
