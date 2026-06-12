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
      className="bg-[#FFFDF5] hover:bg-[#F5F3E7] p-6 rounded-3xl cursor-pointer min-h-[220px] flex items-center justify-center text-center shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        <p className="text-xs uppercase text-gray-500 mb-3">
          {flipped
            ? "Answer"
            : "Question"}
        </p>

        <h2 className="text-lg font-semibold">
          {flipped
            ? answer
            : question}
        </h2>
      </div>
    </div>
  );
};

export default Flashcard;