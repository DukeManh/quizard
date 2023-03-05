import type {
  Question as QuestionType,
  Difficulty,
  NumQuestion,
  QuizSettings,
  Choice,
} from '../types';

class Quiz {
  constructor(
    public id: string,
    public topic: string,
    public difficulty: Difficulty,
    public numQuestions: NumQuestion,
    public questions: Question[],
    public loaded: boolean = false
  ) {}
}

class Question implements QuestionType {
  constructor(
    public number: string,
    public quizId: string,
    public question: string,
    public choices: Record<Choice, string>,
    public answer: Choice,
    public explanation: string
  ) {}
}

export class Quizzes {
  private static quizzes: Quiz[] = [];

  static async findOne(id: string) {
    const quiz = this.quizzes.find((q) => q.id === id);
    if (!quiz) return undefined;
    const { topic, difficulty, numQuestions, questions, loaded } = quiz;
    return {
      id,
      topic,
      difficulty,
      numQuestions,
      questions,
      loaded,
    };
  }

  static async updateOne(id: string, data: Partial<Quiz>) {
    const index = this.quizzes.findIndex((q) => q.id === id);
    if (index === -1) throw new Error('Quiz not found');
    const quiz = this.quizzes[index];
    quiz.difficulty = data.difficulty ?? quiz.difficulty;
    quiz.numQuestions = data.numQuestions ?? quiz.numQuestions;
    quiz.topic = data.topic ?? quiz.topic;
    quiz.questions = data.questions ?? quiz.questions;
    return quiz.id;
  }

  static async deleteOne(id: string) {
    const index = this.quizzes.findIndex((q) => q.id === id);
    if (index === -1) throw new Error('Quiz not found');
    const quizId = this.quizzes[index].id;
    this.quizzes.splice(index, 1);
    return quizId;
  }

  static async insert(data: QuizSettings) {
    const quiz = new Quiz(
      this.quizzes.length.toString(),
      data.topic,
      data.difficulty,
      data.numQuestions,
      []
    );
    this.quizzes.push(quiz);
    return quiz.id;
  }
}
