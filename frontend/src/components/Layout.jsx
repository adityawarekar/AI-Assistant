import { useState } from "react";
import Sidebar, { SidebarContext } from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex min-h-screen bg-[#F5F3E7] overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-16 lg-hidden" />
          <Navbar />

          <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;