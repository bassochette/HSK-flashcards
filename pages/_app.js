import { useState } from "react";
import {
  QuizzContext,
  quizzContextDefaultValue
} from "../context/quizzContext";
import "../App.sass";

function HskApp({ Component, pageProps }) {
  // Maybe useReducer would make more sens than the context API
  const [level, setLevel] = useState(quizzContextDefaultValue.level);
  const [difficulty, setDifficulty] = useState(
    quizzContextDefaultValue.difficulty
  );
  const [questionCount, setQuestionCount] = useState(
    quizzContextDefaultValue.questionCount
  );
  const [errorCount, setErrorCount] = useState(
    quizzContextDefaultValue.errorCount
  );
  const [questionLoading, setQuestionLoading] = useState(
    quizzContextDefaultValue.questionLoading
  );
  const [currentQuestion, setCurrentQuestion] = useState(
    quizzContextDefaultValue.currentQuestion
  );
  const state = {
    level,
    setLevel,
    difficulty,
    setDifficulty,
    resetDifficulty: () => setDifficulty(0),
    questionCount,
    incrementQuestionCount: () => setQuestionCount(questionCount + 1),
    errorCount,
    incrementErrorCount: () => setErrorCount(errorCount + 1),
    questionLoading,
    setQuestionLoading,
    currentQuestion,
    setCurrentQuestion
  };
  return (
    <QuizzContext.Provider value={state}>
      <Component {...pageProps} />
    </QuizzContext.Provider>
  );
}

export default HskApp;
