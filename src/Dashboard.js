import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { MyContext } from "./App";

const Dashboard = () => {
  const menu = useContext(MyContext);
  return (
    <div className="flex h-[92vh]">
      {menu && <Sidebar />}
      <div className="flex-1">
        {/* Title */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
