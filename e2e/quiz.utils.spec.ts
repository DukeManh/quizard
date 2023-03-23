import { test, expect } from '@playwright/test';
import { Timestamp } from 'firebase/firestore';

import { getTimeSince, formatTime } from '~/lib/pages/quiz/utils';

test('getTimeSince should return the correct time since', () => {
  const date = new Date(Date.now() - 30 * 1000);
  const timeSince = getTimeSince(Timestamp.fromDate(date));

  expect(timeSince).toBeGreaterThanOrEqual(30);
});

test('formatTime should return the correct time', () => {
  const times = [1, 30, 60, 90, 120, 150];
  const formattedTimes = [
    '1 second',
    '30 seconds',
    '1 minute',
    '1 minute',
    '2 minutes',
    '2 minutes',
  ];

  times.forEach((time, index) => {
    expect(formatTime(time)).toBe(formattedTimes[index]);
  });
});
