import { motion } from "framer-motion";

const StatCard = ({ title, value }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="relative overflow-hidden bg-white border border-[#FED7AA] rounded-[28px] p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300"
    >


      <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-[#EA580C]/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 break-words">
          {value}
        </h2>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C]"></div>

    </motion.div>
  );
};

export default StatCard;
