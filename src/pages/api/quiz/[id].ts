import type { NextApiRequest, NextApiResponse } from 'next';

import { Quizzes } from '~/utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.redirect('/404');
  }

  try {
    const quiz = await Quizzes.findOne(id as string);
    if (!quiz) {
      return res.redirect('/404');
    }

    return res.status(200).json(quiz);
  } catch {
    return res.redirect('/500');
  }
};
