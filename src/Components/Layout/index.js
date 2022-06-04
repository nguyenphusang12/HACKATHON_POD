import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="w-full bg-slate-400 h-14 text-white text-2xl font-bold flex items-center justify-center">
        Ứng dụng thiết kế thời trang
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
