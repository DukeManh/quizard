import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
} from 'firebase/firestore';

import type { QuizSettings, Choice, Quiz, Question } from '../types';

import { db } from './firebase';

export class Quizzes {
  static async findOne(id: string): Promise<Quiz | undefined> {
    const docRef = doc(db, 'quiz', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return undefined;

    const quiz = docSnap.data() as Quiz;
    return {
      ...quiz,
      questions: quiz.questions.map((q: Question) => ({
        question: q.question,
        choices: q.choices,
        number: q.number,
      })),
      loaded: quiz.loaded,
    };
  }

  static async updateOne(id: string, data: Partial<Quiz>) {
    const docRef = doc(db, 'quiz', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Quiz not found');
    } else {
      setDoc(docRef, data, {
        merge: true,
      });
    }

    return docSnap.id;
  }

  static async deleteOne(id: string) {
    const docRef = doc(db, 'quiz', id);
    await deleteDoc(docRef);
    return id;
  }

  static async insert(data: QuizSettings) {
    const docSnap = await addDoc(collection(db, 'quiz'), {
      topic: data.topic,
      difficulty: data.difficulty,
      numQuestions: data.numQuestions,
      questions: [],
      loaded: false,
    });

    return docSnap.id;
  }

  static async checkAnswer(id: string, questionNumber: string, choice: Choice) {
    const docRef = doc(db, 'quiz', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Quiz not found');
    } else {
      const question = docSnap
        .data()
        .questions.find((q: Question) => q.number === questionNumber);
      return {
        correct: question.answer === choice,
        explanation: question.explanation,
        answer: question.answer,
        choice,
        questionNumber,
        quizId: id,
      };
    }
  }
}
