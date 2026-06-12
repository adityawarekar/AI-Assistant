import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md">

          <h1 className="text-4xl font-bold mb-6">
            My Profile
          </h1>

          <div className="space-y-6">

            <div className="bg-[#F5F3E7] p-5 rounded-2xl">
              <p className="text-gray-500">
                Full Name
              </p>

              <h2 className="text-xl font-bold">
                {user?.name}
              </h2>
            </div>

            <div className="bg-[#F5F3E7] p-5 rounded-2xl">
              <p className="text-gray-500">
                Email Address
              </p>

              <h2 className="text-xl font-bold">
                {user?.email}
              </h2>
            </div>

          </div>

        </div>
      </motion.div>
    </Layout>
  );
};

export default Profile;