import { useContext } from "react";

import {
  QuizzContext,
  quizzContextDefaultValue
} from "../context/quizzContext";

export const QuizzSelector = () => {
  const quizzContext = useContext(QuizzContext);
  const { level, setLevel } = quizzContext;
  const updateLevel = event => {
    setLevel(event.target.value);
  };
  return (
    <section>
      <select className="input" value={level} onChange={updateLevel}>
        <option value="1">HSK 1</option>
        <option value="2">HSK 2</option>
        <option value="3">HSK 3</option>
        <option value="4">HSK 4</option>
        <option value="5">HSK 5</option>
        <option value="6">HSK 6</option>
      </select>
    </section>
  );
};
