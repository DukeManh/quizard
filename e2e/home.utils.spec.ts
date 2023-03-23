import { test, expect } from '@playwright/test';

import { shuffleChoices } from '~/pages/api/quiz';
import type { GeneratedQuestion } from '~/types';
import { Choice } from '~/types';

const question = {
  question: 'What is the answer to life, the universe, and everything?',
  choices: {
    A: '42',
    B: '24',
    C: '12',
    D: '6',
  },
  answer: Choice.A,
  number: '1',
};

test('shuffleChoices should return the same question and answer', () => {
  const shuffle = (q: GeneratedQuestion) => {
    const shuffledQuestion = shuffleChoices(q);

    expect(shuffledQuestion.question).toBe(q.question);

    expect(shuffledQuestion.choices[shuffledQuestion.answer]).toBe(
      q.choices[q.answer]
    );
  };

  shuffle(question);

  shuffle({
    ...question,
    answer: Choice.B,
  });

  shuffle({
    ...question,
    answer: Choice.C,
  });

  shuffle({
    ...question,
    answer: Choice.D,
  });
});
