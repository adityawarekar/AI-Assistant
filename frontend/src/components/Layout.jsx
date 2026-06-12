import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F3E7]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;