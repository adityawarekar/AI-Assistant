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
      className="relative overflow-hidden bg-white border border-[#ECE8D5] rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
    >
  

      <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9D66B]/20 rounded-full blur-2xl"></div>

      

      <div className="relative z-10">

        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>

        <h2 className="text-5xl font-bold text-gray-900 mt-3">
          {value}
        </h2>

      </div>

      

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#E9D66B] via-yellow-300 to-[#E9D66B]"></div>

    </motion.div>
  );
};

export default StatCard;
