import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitlePage } from "Store";

const Payment = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitlePage("Thanh toán"));
  }, []);
  return (
    <div className="w-4/5 mx-auto">
      <div className="text-xl font-bold text-left text-[#11006F]">
        Thông tin giao hàng
      </div>
      <div className="text-left">
        <label htmlFor="adresssID" className="text-xs text-gray-300 block my-2">
          Họ và tên
        </label>
        <div className="border rounded-md border-[#dbdbdb]">
          <input
            type="text"
            name=""
            placeholder="Họ và tên"
            id="adresssID"
            className="h-8 px-2 text-sm w-full rounded-md outline-none"
          />
        </div>
        <label htmlFor="adresssID" className="text-xs text-gray-300 block my-2">
          Số điên thoại
        </label>
        <div className="border rounded-md border-[#dbdbdb]">
          <input
            type="text"
            name=""
            placeholder="Số điên thoại"
            id="adresssID"
            className="h-8 px-2 text-sm w-full rounded-md outline-none"
          />
        </div>
        <label htmlFor="adresssID" className="text-xs text-gray-300 block my-2">
          Email
        </label>
        <div className="border rounded-md border-[#dbdbdb]">
          <input
            type="text"
            name=""
            placeholder="Email"
            id="adresssID"
            className="h-8 px-2 text-sm w-full rounded-md outline-none"
          />
        </div>
        <label htmlFor="adresssID" className="text-xs text-gray-300 block my-2">
          Địa chỉ
        </label>
        <div className="border rounded-md border-[#dbdbdb]">
          <input
            type="text"
            name=""
            placeholder="Địa chỉ"
            id="adresssID"
            className="h-8 px-2 text-sm w-full rounded-md outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-left">
          <label htmlFor="cityID" className="text-xs text-gray-300 block my-2">
            Tỉnh/Thành Phố
          </label>
          <div className="border rounded-md border-[#dbdbdb]">
            <input
              type="text"
              name=""
              placeholder="Tỉnh/Thành Phố"
              id="cityID"
              className="px-2 h-8 text-sm w-full rounded-md outline-none"
            />
          </div>
        </div>
        <div className="text-left">
          <label htmlFor="cityID" className="text-xs text-gray-300 block my-2">
            Quận/Huyện
          </label>
          <div className="border rounded-md border-[#dbdbdb]">
            <input
              type="text"
              name=""
              placeholder="Quận/Huyện"
              id="cityID"
              className="px-2 h-8 text-sm w-full rounded-md outline-none"
            />
          </div>
        </div>
        <div className="text-left">
          <label htmlFor="cityID" className="text-xs text-gray-300 block my-2">
            Phường/Xã
          </label>
          <div className="border rounded-md border-[#dbdbdb]">
            <input
              type="text"
              name=""
              placeholder="Phường/Xã"
              id="cityID"
              className="px-2 h-8 text-sm w-full rounded-md outline-none"
            />
          </div>
        </div>
      </div>
      <form action="" className="text-left">
        <div className="my-2">
          <input type="radio" name="giaohang" id="giaohang1" className="mr-2" />
          <label htmlFor="giaohang1">
            Giao tận nơi (Nhận hàng vào ngày 6 tháng 06 - ngày 9 tháng 06 năm
            2022)
          </label>
        </div>
        <div className="my-2">
          <input type="radio" name="giaohang" id="giaohang3" className="mr-2" />
          <label htmlFor="giaohang3">
            Giao siêu tốc (Nhận hàng sau 2 giờ kể từ lúc in)
          </label>
        </div>
        <div className="my-2">
          <input type="radio" name="giaohang" id="giaohang2" className="mr-2" />
          <label htmlFor="giaohang2">Lấy tại cửa hàng</label>
        </div>
      </form>
      <div>
        <div className="text-left my-2 text-base font-bold">
          Chọn 1 cửa hàng Yody gần bạn nhất
        </div>
        <div className="grid grid-cols-2 gap-3 h-[340px]">
          <form className="py-4 flex flex-col justify-evenly">
            <div className="flex items-center border border-black border-t-0 border-l-0 border-r-0 py-1">
              <div className="mx-6 h-full flex items-center">
                <input type="radio" name="setAdress" id="" />
              </div>
              <div className="flex-1 text-left">
                <div>Yody Trần Duy Hưng</div>
                <div>12 Trần Duy Hưng, Cầu Giấy, Hà Nội</div>
              </div>
              <div className="w-28 text-left">3km</div>
            </div>
            <div className="flex items-center border border-black border-t-0 border-l-0 border-r-0 py-1">
              <div className="mx-6 h-full flex items-center">
                <input type="radio" name="setAdress" id="" />
              </div>
              <div className="flex-1 text-left">
                <div>Yody Trần Duy Hưng</div>
                <div>12 Trần Duy Hưng, Cầu Giấy, Hà Nội</div>
              </div>
              <div className="w-28 text-left">3km</div>
            </div>
            <div className="flex items-center border border-black border-t-0 border-l-0 border-r-0 py-1">
              <div className="mx-6 h-full flex items-center">
                <input type="radio" name="setAdress" id="" />
              </div>
              <div className="flex-1 text-left">
                <div>Yody Trần Duy Hưng</div>
                <div>12 Trần Duy Hưng, Cầu Giấy, Hà Nội</div>
              </div>
              <div className="w-28 text-left">3km</div>
            </div>
          </form>
          <div className="h-full">
            <img
              src="https://tackexinh.com/wp-content/uploads/2021/03/hinh-nen-girl-xinh-4k-cho-pc-03.jpg"
              alt=""
              className="h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold text-left my-5 text-[#11006F]">
          Thông tin sản phẩm
        </div>
        <div className="flex py-2 text-left font-bold flex">
          <div className="flex-1">Sản phẩm</div>
          <div className="flex-1 text-right">Số lượng áo</div>
          <div className="flex-1 text-right">Sửa</div>
          <div className="flex-1 text-right">Tổng tiền</div>
        </div>
        <hr />
        <div className="">
          <div className="">
            <div className="flex text-left items-center py-2">
              <div className="flex-1 h-full flex text-left">
                <img
                  src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-chau-Au-My.jpg"
                  alt=""
                  className="w-16 h-full rounded-md mr-2"
                />
                <div className="text-sm break-all">
                  <div className="">Áo Bóng Chày</div>
                  <div className="">95% cotton, 5% spandex</div>
                  <div>Size áo - Số lượng: XS-02;XL-10</div>
                </div>
              </div>
              <div className="">12(cái)</div>
              <div className="">
                <i className="fa-solid fa-trash-can"></i>
              </div>
              <div className="flex-1 text-right">685,500đ</div>
            </div>
            <div className="flex text-left items-center py-2">
              <div className="flex-1 h-full flex text-left">
                <img
                  src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-chau-Au-My.jpg"
                  alt=""
                  className="w-16 h-full rounded-md mr-2"
                />
                <div className="text-sm break-all">
                  <div className="">Áo Bóng Chày</div>
                  <div className="">95% cotton, 5% spandex</div>
                  <div>Size áo - Số lượng: XS-02;XL-10</div>
                </div>
              </div>
              <div className="flex-1 text-right">12(cái)</div>
              <div className="flex-1 text-right">
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <div className="flex-1 text-right">685,500đ</div>
            </div>
            <div className="flex text-left items-center py-2">
              <div className="flex-1 h-full flex text-left">
                <img
                  src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-chau-Au-My.jpg"
                  alt=""
                  className="w-16 h-full rounded-md mr-2"
                />
                <div className="text-sm break-all">
                  <div className="">Áo Bóng Chày</div>
                  <div className="">95% cotton, 5% spandex</div>
                  <div>Size áo - Số lượng: XS-02;XL-10</div>
                </div>
              </div>
              <div className="flex-1 text-right">12(cái)</div>
              <div className="flex-1 text-right">
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <div className="flex-1 text-right">685,500đ</div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="py-4 border border-[#dbdbdb] border-t-0 border-l-0 border-r-0">
        <div className="w-1/3 ml-auto">
          <div className="flex justify-between">
            <div>Tổng tiền hàng</div>
            <div className="">2,065,000đ</div>
          </div>
          <div className="flex justify-between">
            <div>Phí vận chuyển</div>
            <div className=" ">65,000đ</div>
          </div>
          <div className="flex justify-between">
            <div>Tổng thanh toán</div>
            <div className="">2,130,000đ</div>
          </div>
        </div>
      </div>
      <div className="w-32 py-3 my-2 ml-auto rounded-md bg-[#0C5DFF] text-white">
        Thanh toán
      </div>
    </div>
  );
};

export default Payment;
