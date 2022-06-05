import React from "react";

const Payment = () => {
  return (
    <div>
      <div className="text-xl font-bold text-left">Địa chỉ nhận hàng</div>
      <div className="text-left">
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
          <input type="radio" name="giaohang" id="giaohang1" className="mr-2"/>
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
        <div>Chọn 1 cửa hàng Yody gần bạn nhất</div>
        <div>
          <form>
            <div>
              <input type="radio" name="setAdress" id="" />
              <div>
                <div>Yody Trần Duy Hưng</div>
                <div>12 Trần Duy Hưng, Cầu Giấy, Hà Nội</div>
              </div>
              <div>3km</div>
            </div>
          </form>
          <div>
            <img
              src="https://tackexinh.com/wp-content/uploads/2021/03/hinh-nen-girl-xinh-4k-cho-pc-03.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div>Thông tin sản phẩm</div>
        <div>
          <div>Sản phẩm</div>
          <div>Số lượng áo</div>
          <div className="">Sửa</div>
          <div className="">Tổng tiền</div>
        </div>
        <hr />
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="">
                  <div className="">Áo Bóng Chày</div>
                  <div className="">95% cotton, 5% spandex</div>
                  <div>Size áo - Số lượng: XS-02;XL-10</div>
                </div>
              </div>
              <div className="">12(cái)</div>
              <div className="">
                <i className="fa-solid fa-trash-can"></i>
              </div>
              <div className="">685,500đ</div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div>
        <div className="">
          <div>
            <div>Tổng tiền hàng</div>
            <div>2,065,000đ</div>
          </div>
          <div>
            <div>Phí vận chuyển</div>
            <div>65,000đ</div>
          </div>
          <div>
            <div>Tổng thanh toán</div>
            <div>2,130,000đ</div>
          </div>
        </div>
        <hr />
      </div>
      <div className="">Thanh toán</div>
    </div>
  );
};

export default Payment;
