import type { Timestamp } from 'firebase/firestore';

import type { Choice } from '~/types';

export const getQuiz = async (id: string) => {
  const res = await fetch(`/api/quiz/${id}`);
  return res.json();
};

export const checkAnswer = async (
  id: string,
  questionNumber: string,
  choice: Choice
) => {
  const res = await fetch(`/api/quiz/${id}/question/${questionNumber}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ choice }),
  });
  return res.json();
};

export const getTimeSince = (date: Timestamp) => {
  return Math.round(Date.now() / 1000 - date.seconds);
};

export const formatTime = (time: number) => {
  if (time < 60) {
    return `${time} ${time === 1 ? 'second' : 'seconds'}`;
  }
  const minute = Math.floor(time / 60);
  return `${minute} ${minute === 1 ? 'minute' : 'minutes'}`;
};
