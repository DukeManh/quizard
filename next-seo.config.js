/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'quizard',
  titleTemplate: '%s | quizard',
  defaultTitle: 'quizard',
  description: 'Quiz me on any anything',
  canonical: 'https://quizard-kappa.vercel.app/',
  openGraph: {
    url: 'https://quizard-kappa.vercel.app/',
    title: 'quizard',
    description: 'Quiz me on any anything',
    images: [
      {
        url: 'https://quizard-kappa.vercel.app/og.png',
        alt: 'quizard - quizzes, trivia on any topic',
      },
    ],
    site_name: 'quizard',
  },
  twitter: {
    handle: '@DucBuiManh',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
