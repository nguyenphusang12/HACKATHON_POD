import React from "react";
import shape from 'assets/image/Shape.png'

const ItemMenu = ({ title, icon }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center p-3 bg-[#eeeeee] first:rounded-t-md hover:bg-gray-300 hover:text-white cursor-pointer select-none">
        <div className="flex">
          <img src={icon} className="w-7 h-5 object-cover mr-2" alt="img" />
          <span className="text-base break-all">{title}</span>
        </div>
        <div>
          <img src={shape} alt="" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#bebaba]" />
    </>
  );
};

export default ItemMenu;
