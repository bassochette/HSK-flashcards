import { createContext } from "react";

export const quizzContextDefaultValue = {
  level: 1,
  setLevel: () => {},
  difficulty: 1,
  setDifficulty: () => {},
  resetDifficulty: () => {},
  questionCount: 0,
  incrementQuestionCount: () => {},
  errorCount: 0,
  incrementErrorCount: () => {},
  questionLoading: false,
  setQuestionLoading: () => {},
  currentQuestion: {
    uuid: "",
    statement: "Not loaded...",
    answers: []
  },
  setCurrentQuestion: () => {}
};

export const QuizzContext = createContext(quizzContextDefaultValue);
