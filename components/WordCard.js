import { useState, useEffect } from "react";

export const WordCard = ({ simplified, pinyin, en, related = [] }) => {
  const [displayPinyin, setDisplayPinyin] = useState(false);
  const toggleDisplay = () => setDisplayPinyin(!displayPinyin);

  const style = {
    maxWidth: "20em"
  };

  return (
    <div className="card" style={style}>
      <div
        className="card-image has-text-centered"
        onMouseEnter={toggleDisplay}
        onMouseLeave={toggleDisplay}
      >
        <p className={`is-title is-1 ${displayPinyin ? "is-hidden" : ""}`}>
          {simplified}
        </p>
        <p className={`is-title is-1 ${displayPinyin ? "" : "is-hidden"}`}>
          {pinyin}
        </p>
      </div>
      <div className="card-content has-text-centered">
        <p>{en}</p>
      </div>
    </div>
  );
};
