const StatCard = ({ title, value }) => {
  return (
    <div className="bg-slate-800 text-white p-4 rounded-lg">
      <h3>{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;