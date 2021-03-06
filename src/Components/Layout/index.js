import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logoYody from "assets/image/Yody.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const titlePage = useSelector((state) => state.product.titlePage);
  const products = useSelector((state) => state.product.products);
  const [showModal, setShowModal] = useState(false);
  let navigate = useNavigate();
  const goHome = () => {
    navigate(`/`);
  };
  const goPayment = () => {
    navigate("/payment");
    setShowModal(false);
  };
  return (
    <div className="max-w-7xl w-full px-4 mx-auto">
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.3)] z-[1]"
        ></div>
      )}
      <div className="w-full relative h-20 flex items-center justify-center">
        <div className="absolute left-0 cursor-pointer" onClick={goHome}>
          <img src={logoYody} alt="Yo" className="w-24" />
        </div>
        <div className="text-2xl text-2xl font-bold">{titlePage}</div>
        <div className="absolute right-0 ">
          {showModal && (
            <div className="block border-[20px] border-l-transparent border-t-transparent border-r-transparent border-b-white absolute top-2 -right-2 z-[2]"></div>
          )}
          <div onClick={() => setShowModal(!showModal)}>
            <i className="fa-solid fa-cart-shopping text-xl cursor-pointer"></i>
          </div>
          {showModal && (
            <div className="absolute top-[calc(100%+15px)] -right-3 w-96 max-h-96 px-2 pb-2 bg-white rounded-md z-10 overflow-auto">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex py-3 h-24 border-b border-solid border-gray-400"
                >
                  <div className="w-20">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="text-left flex-1 px-2 text-sm">
                    <div className="font-bold text-base">{item.name}</div>
                    <div>{item.type}</div>
                    <div>S??? l?????ng: {item.value}</div>
                  </div>
                  <div className="">
                    <div>685,500??</div>
                    <div className="cursor-pointer active:opacity-80">
                      <i className="fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right font-bold my-1">T???ng: 8,000,000 ??</div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#dbdbdb] text-black rounded active:opacity-80"
                >
                  ????ng
                </button>
                <button
                  className="px-4 py-2 bg-[#0C5DFF] text-white rounded active:opacity-80"
                  onClick={goPayment}
                >
                  Thanh to??n
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
