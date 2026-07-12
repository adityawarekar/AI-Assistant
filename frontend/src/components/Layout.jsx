import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F3E7] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;