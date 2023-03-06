import type { NextApiRequest, NextApiResponse } from 'next';

import { Quizzes } from '~/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.redirect('/404');
  }

  try {
    const quiz = await Quizzes.findOne(id as string);
    if (!quiz) {
      res.redirect('/404');
    } else {
      res.status(200).json(quiz);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.redirect('/500');
  }
};
