import { motion } from "framer-motion";

const StatCard = ({ title, value }) => {
  return (
    <motion.div
    whileHover={{
      y: -5,
      scale: 1.02,
    }}
    className="bg-[#FFFDF5] p-6 rounded-3xl shadow-md border-gray-100"
    >
      <h3 className="text-gray-500 text-sm mb-2">
        {title}
      </h3>

      <p className="text-4xl font-bold text-black">
        {value}
      </p>

    </motion.div>
    
  );
};

export default StatCard;