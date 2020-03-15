import { useContext, useEffect } from "react";
import axios from "axios";

import { config } from "../config";
import { QuizzContext } from "../context/quizzContext";

const apiUrl = config.apiUrl;

const fetchQuestion = async ({
  level,
  difficulty,
  setQuestionLoading,
  setCurrentQuestion
}) => {
  const response = await axios.get(
    `${apiUrl}/quizz/question/hsk${level}/${difficulty}`
  );
  setCurrentQuestion(response.data);
  setQuestionLoading(false);
};

const validateAnswer = async ({ answer, questionUuid, quizzContext }) => {
  const {
    incrementQuestionCount,
    incrementErrorCount,
    setDifficulty,
    questionCount
  } = quizzContext;
  incrementQuestionCount();
  const response = await axios.post(`${apiUrl}/quizz/answer/${questionUuid}`, {
    answer
  });
  const isValid = response.data;
  if (!isValid) {
    incrementErrorCount();
  }
  if (questionCount && questionCount % 10 === 0) {
    setDifficulty(quizzContext.difficulty + 1);
  }

  fetchQuestion(quizzContext);
};

const Answers = ({ answers, questionUuid, quizzContext }) => {
  return answers.map(a => (
    <div
      className="card"
      onClick={() => validateAnswer({ answer: a, questionUuid, quizzContext })}
    >
      <div className="card-content">{a}</div>
    </div>
  ));
};

export const Quizz = () => {
  const quizzContext = useContext(QuizzContext);
  const {
    level,
    currentQuestion,
    questionLoading,
    errorCount,
    questionCount
  } = quizzContext;

  useEffect(() => {
    fetchQuestion(quizzContext).catch(error => {
      // TODO: handle error, maybe display a specific component or retry X times
      console.log("An error occured while fetching a question ", error);
    });
  }, [level]);

  if (questionLoading) {
    return <div>Loading...</div>;
  }

  const quizzStyle = {
    padding: "2em"
  };

  return (
    <section className="has-text-centered" style={quizzStyle}>
      <section>
        <span className="tag is-success">{questionCount - errorCount}</span>
        <span className="tag is-danger">{errorCount}</span>
        <span className="tag is-info">{questionCount}</span>
        <progress
          className="progress is-large is-success"
          value={questionCount - errorCount}
          max={questionCount}
        ></progress>
      </section>
      <h1 className="title is-1">{currentQuestion.statement}</h1>
      <h2 className="is-2">{currentQuestion && currentQuestion.tip}</h2>
      <Answers
        answers={currentQuestion.answers}
        questionUuid={currentQuestion.uuid}
        quizzContext={quizzContext}
      />
    </section>
  );
};
