import React from "react";

const ItemMenu = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 hover:bg-gray-300 hover:text-white cursor-pointer select-none">
      <img src={icon} className="w-7 h-7 object-cover" alt="img" />
      <span className="text-base break-all">{title}</span>
    </div>
  );
};

export default ItemMenu;
