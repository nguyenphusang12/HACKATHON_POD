import React, { useEffect, useState } from "react";
import shirt_1 from "assets/image/shirt_1.svg";
import shirt_2 from "assets/image/shirt_2.svg";
import shirt_3 from "assets/image/shirt_3.svg";
import shirt_4 from "assets/image/shirt_4.svg";
import shirt_5 from "assets/image/shirt_5.svg";
import shirt_6 from "assets/image/shirt_6.svg";

const DetailMenu = ({ item }) => {
  const [body, setBody] = useState();
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
      default:
        return;
    }
  }, []);

  return <div className="h-56 overflow-auto">{body ? body : "No data"}</div>;
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
