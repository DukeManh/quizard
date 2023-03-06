import type { NextApiRequest, NextApiResponse } from 'next';

import { Quizzes } from '~/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, qId } = req.query;

  if (req.method !== 'POST') {
    res.redirect('/404');
  }

  try {
    const check = await Quizzes.checkAnswer(
      id as string,
      qId as string,
      req.body.choice
    );
    res.status(200).json(check);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.redirect('/404');
  }
};
