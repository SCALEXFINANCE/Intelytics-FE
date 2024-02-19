import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className=" h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="  bg-slate-950 flex-1 px-6 pt-8 pb-4 text-white border-1 border-dashed overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;
