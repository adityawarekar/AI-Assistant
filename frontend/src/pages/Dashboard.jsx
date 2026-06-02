import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Documents" value="0" />
        <StatCard title="Flashcards" value="0" />
        <StatCard title="Quizzes" value="0" />
        <StatCard title="Accuracy" value="0%" />
      </div>

    </div>
  )
};
export default Dashboard;