import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logoYody from "assets/image/Yody.svg";

const Layout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-7xl w-full px-4 mx-auto">
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.3)] z-[1]"></div>
      )}
      <div className="w-full relative h-20 flex items-center justify-center">
        <div className="absolute left-0">
          <img src={logoYody} alt="Yo" />
        </div>
        <div className="text-2xl text-2xl font-bold">
          Thiết kế mẫu áo của bạn
        </div>
        <div className="absolute right-0 ">
          {showModal && (
            <div className="block border-[20px] border-l-transparent border-t-transparent border-r-transparent border-b-white absolute top-2 -right-2 z-[2]"></div>
          )}
          <div onClick={() => setShowModal(!showModal)}>
            <i class="fa-solid fa-cart-shopping text-xl cursor-pointer"></i>
          </div>
          {showModal && (
            <div className="absolute top-[calc(100%+15px)] -right-3 w-96 max-h-96 px-2 pb-2 bg-white rounded-md z-10 overflow-auto">
              <div className="flex py-3 h-24 border-b border-solid border-gray-400">
                <div className="w-20">
                  <img
                    src="https://bienthuy.com/bienthuy-img/2020/04/pexels-photo-675920-scaled.jpeg"
                    alt=""
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="text-left flex-1 px-2 text-sm">
                  <div className="font-bold text-base">Áo bóng chày</div>
                  <div>95% cotton, 5% spandex</div>
                  <div>Số lượng: 12</div>
                </div>
                <div className="">
                  <div>685,500đ</div>
                  <div className="cursor-pointer active:opacity-80">
                    <i class="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>

              <div className="text-right font-bold my-1">Tổng: 8,000,000 đ</div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#dbdbdb] text-black rounded active:opacity-80"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-[#0C5DFF] text-white rounded active:opacity-80">
                  Thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
