<img src="./public/quizard.svg" alt="Quizard" width="100" />
# Quizard

[Quizard](quizard-kappa.vercel.app/): chatGPT-generated quizzes on any just-about topic.

- AI-powered quiz generation
- Topic suggestions on your input
- Scoring and feedback
- Multiple choice questions
- Using your own API key
- Sharing quizzes

## Running locally

How to run the app locally:

### Requirements:

- openAI key: You need an [openAI API key](https://platform.openai.com/account/api-keys) to generate quizzes and topic suggestions.

- A Firebase project: Create a [new firebase project](https://console.firebase.google.com/u/0/), which offers [Firestore database](https://firebase.google.com/docs/firestore), which is used to store quiz data.

- NodeJS >= v16: Install NodeJS locally using [nvm](https://github.com/nvm-sh/nvm).

### Repo setup

1. Clone the repo.

```sh
  git clone https://github.com/DukeManh/quizard.git
```

2. Copy the example environment file from `.env.example` to `.env`.

```sh
  cp .env.example .env
```

3. Replace the environment variables with your own values.

- `OPENAI_API_KEY`: openAI API key
- `FB_*` : Firebase project config

4. Install dependencies.

```sh
  npm install -g pnpm
  pnpm install
```

### App

5. Run the app.

```sh
  pnpm dev
```

## Technologies

- Next.js: React framework for server-side rendered apps
- TypeScript: A typed superset of JavaScript
- Chakra UI: React component library
- chatGPT: chatGPT API using `gpt-3.5-turbo` model to generate quizzes
- Firestore: Serverless NoSQL database for storing quiz data

## License

[MIT](https://choosealicense.com/licenses/mit/)
