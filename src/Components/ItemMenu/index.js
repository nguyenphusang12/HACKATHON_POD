import React from "react";
import iconAdd from "assets/image/Shape_6.png";

const ItemMenu = ({ title, icon, handleClickMenu, item }) => {
  const handleClick = () => {
    handleClickMenu(item.id);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="flex flex-row justify-between items-center p-2 bg-[#eeeeee] first:rounded-t-md hover:bg-gray-300 hover:text-white cursor-pointer select-none"
      >
        <div className="flex items-center">
          <img src={icon} className="w-5 h-5 object-cover mr-2" alt="img" />
          <span className="text-base break-all">{title}</span>
        </div>
        <div>
          <img src={iconAdd} alt="" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#bebaba]" />
    </>
  );
};

export default ItemMenu;
