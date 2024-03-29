import type { Timestamp } from 'firebase/firestore';
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
  failed: boolean;
  reason?: string;
  last_updated: Date;
  created_date: Timestamp;
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
}

export interface GeneratedQuestion extends Question {
  answer: Choice;
}

export interface Answer {
  correct: boolean;
  explanation: string;
  answer: Choice;
  choice: Choice;
  quizId: string;
  questionNumber: string;
}
