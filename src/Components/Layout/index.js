import React from "react";
import { Outlet } from "react-router-dom";
import logoYody from "assets/image/Yody.svg";

const Layout = () => {
  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="w-full relative h-20 flex items-center justify-center">
        <div className="absolute left-0">
          <img src={logoYody} alt="Yo" />
        </div>
        <div className="text-2xl text-2xl font-bold">
          Thiết kế mẫu áo của bạn
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
