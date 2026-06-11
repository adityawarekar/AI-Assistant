import { useState } from "react";

const Flashcard = ({
  question,
  answer,
}) => {
  const [flipped, setFlipped] =
    useState(false);

  return (
    <div
      onClick={() =>
        setFlipped(!flipped)
      }
      className="bg-slate-800 hover:bg-slate-700 transition duration-300 p-6 rounded-xl cursor-pointer min-h-[220px] flex flex-col items-center justify-center text-center shadow-lg hover:scale-105"
    >
      <p className="text-xs text-gray-400 mb-3">
        {flipped
          ? "Answer"
          : "Question"}
      </p>

      <h2 className="text-lg font-semibold">
        {flipped
          ? answer
          : question}
      </h2>

      <p className="text-xs text-blue-400 mt-4">
        Click to flip
      </p>
    </div>
  );
};

export default Flashcard;