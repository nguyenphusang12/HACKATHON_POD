import React, { useEffect, useState } from "react";
import shirt_1 from "assets/image/shirt_1.svg";
import shirt_2 from "assets/image/shirt_2.svg";
import shirt_3 from "assets/image/shirt_3.svg";
import shirt_4 from "assets/image/shirt_4.svg";
import shirt_5 from "assets/image/shirt_5.svg";
import shirt_6 from "assets/image/shirt_6.svg";
import fram981 from "assets/image/frame981.png";

const DetailMenu = ({ item, setColor }) => {
  const [body, setBody] = useState();
  const [select, setSelect] = useState();
  useEffect(() => {
    switch (item.id) {
      case 1:
        setBody(
          <div className="grid grid-cols-3 gap-3">
            {LIST_TYPE_LAYOUT.map((item, index) => (
              <div key={index} className=" cursor-pointer">
                <img src={item.icon} alt="" />
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        );
        return;
      case 2:
        setBody(
          <div className="p-3">
            <div className="grid grid-cols-2 gap-3">
              {LIST_MATERIALS.map((item) => (
                <div onClick={() => setSelect(item)} className="">
                  <div className="relative">
                    <img src={fram981} alt="gbc" className="mb-2" />
                    <div className="text-white absolute bottom-0 right-0 text-xs p-1 rounded bg-[rgba(0,0,0,.7)]">
                      Khuyên dùng
                    </div>
                  </div>
                  <div className="text-sm">{item.desc}</div>
                  <span className="text-sm">
                    Màu sắc:
                    {item.color.map((item, index) => (
                      <button
                        key={index}
                        className="w-3 h-3 mr-1 first:ml-1 rounded-full"
                        style={{ background: item }}
                      ></button>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            {select && (
              <div className="">
                <span className="text-sm">
                  Chọn màu sắc:
                  {select.color.map((item, index) => (
                    <button
                      key={index}
                      className="w-3 h-3 mr-1 text-sm first:ml-1 rounded-full"
                      style={{ background: item }}
                      onClick={() => setColor(item)}
                    ></button>
                  ))}
                </span>
                <div className="text-sm">Đã chọn chất liệu {select.desc}</div>
              </div>
            )}
          </div>
        );
        return;
      default:
        return;
    }
  }, [select]);

  return <div className="h-auto max-h-64 overflow-auto">{body ? body : "No data"}</div>;
};

export default DetailMenu;
const LIST_TYPE_LAYOUT = [
  {
    name: "Cổ tròn tay dài",
    icon: shirt_1,
  },
  {
    name: "Cổ tròn tay ngắn",
    icon: shirt_2,
  },
  {
    name: "Hoodie tay ngắn",
    icon: shirt_3,
  },
  {
    name: "Cổ bẻ tay ngắn",
    icon: shirt_4,
  },
  {
    name: "Hoodie tay dài",
    icon: shirt_5,
  },
  {
    name: "Cổ tròn tay ngắn nữ",
    icon: shirt_6,
  },
];
const LIST_MATERIALS = [
  {
    id: 1,
    desc: "95% cotton, 5% spandex95% cotton, 5% spandex",
    color: ["#E69E1E", "#428F5E", "#0A4ACC"],
  },
  {
    id: 2,
    desc: "65% cotton, 15% spandex95% cotton, 20% spandex",
    color: ["red", "green", "blue"],
  },
];
