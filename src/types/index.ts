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

export interface Quiz extends QuizSettings {
  id: string;
  questions: Question[];
  loaded: boolean;
}

export enum Choice {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export interface Question {
  number: string;
  question: string;
  choices: Record<Choice, string>;
  answer: Choice;
  explanation: string;
}
