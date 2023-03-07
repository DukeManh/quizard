import type { Difficulty, NumQuestion, Topic } from '~/types';

export const getQuizGenerationPrompt = (
  numQuestion: NumQuestion,
  difficulty: Difficulty,
  topic: Topic
) => {
  return `Generate a quiz with the requested number of questions, difficulty level and topic.You must be highly confident in knowing the correct answer to the questions.The multiple choices should be short and maximum of 2 sentences.

New: 2 questions, easy difficulty, the topic is "Breaking Bad"
Quiz: [
    {
      "question": "What is the name of the chemical compound that Walter White and Jesse Pinkman cook in the series?",
      "choices": {
        "A": "Methamphetamine",
        "B": "Cocaine",
        "C": "Heroin",
        "D": "LSD"
      },
      "answer": "A",
      "explanation": "This is the drug that Walter and Jesse cook and sell throughout the series. It is a highly addictive and dangerous drug that causes severe health problems."
    },
    {
      "question": "What is the name of the drug kingpin that Walter White works for in the series?",
      "choices": {
        "A": "Gus Fring",
        "B": "Tuco Salamanca",
        "C": "Hector Salamanca",
        "D": "Don Eladio"
      },
      "answer": "A",
      "explanation": "Gus is a highly intelligent and ruthless drug lord who becomes a major antagonist in the series. He is known for his calm demeanor and meticulous planning."
    }
  ]

"""
New: 1 question, hard difficulty, the topic is "ReactJS"
Quiz: [
  {
    "question": "What is the difference between a controlled component and an uncontrolled component in React?",
    "choices": {
      "A": "Controlled components have their state managed by React, while uncontrolled components have their state managed by the DOM.",
      "B": "Controlled components are easier to use than uncontrolled components since they don't require additional event handlers.",
      "C": "Uncontrolled components are more efficient than controlled components since they don't require additional rendering cycles.",
      "D": "Controlled components and uncontrolled components are the same and can be used interchangeably."
    },
    "answer": "A",
    "explanation": "Controlled components are React components that have their state managed by React, while uncontrolled components have their state managed by the DOM. This means that controlled components are more flexible and allow for more control over the data being manipulated."
  }
]
"""

New: ${numQuestion} question(s), ${difficulty} difficulty, the topic is "${topic}"
Quiz: `;
};
