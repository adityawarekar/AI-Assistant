import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Flashcard = ({
  question,
  answer,
}) => {
  const [flipped, setFlipped] =
    useState(false);

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={() =>
        setFlipped(!flipped)
      }
      className="
      relative
      overflow-hidden
      cursor-pointer
      rounded-[28px]
      min-h-[260px]
      p-8
      bg-white
      border
      border-gray-100
      shadow-lg
      hover:shadow-2xl
      transition-all
      duration-500
      flex
      items-center
      justify-center
      text-center
      group
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition
        duration-500
        bg-gradient-to-br
        from-yellow-100/60
        via-transparent
        to-orange-100/50
        "
      />

      {/* Badge */}

      <div
        className="
        absolute
        top-4
        left-4
        text-xs
        font-medium
        px-3
        py-1
        rounded-full
        bg-[#F5F3E7]
        text-gray-600
        "
      >
        {flipped
          ? "Answer"
          : "Question"}
      </div>

      {/* Click Hint */}

      <div
        className="
        absolute
        top-4
        right-4
        text-gray-400
        text-xs
        "
      >
        Click to flip
      </div>

      <AnimatePresence mode="wait">

        <motion.div
          key={
            flipped
              ? "answer"
              : "question"
          }
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative z-10"
        >
          <h2
            className="
            text-xl
            font-semibold
            leading-relaxed
            text-gray-800
            "
          >
            {flipped
              ? answer
              : question}
          </h2>
        </motion.div>

      </AnimatePresence>

      {/* Bottom Indicator */}

      <div
        className="
        absolute
        bottom-0
        left-0
        w-full
        h-1
        bg-gradient-to-r
        from-[#E9D66B]
        to-yellow-300
        "
      />
    </motion.div>
  );
};

export default Flashcard;