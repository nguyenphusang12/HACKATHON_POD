import React, { useEffect, useState } from "react";
import shirt_1 from "assets/image/shirt_1.svg";
import shirt_2 from "assets/image/shirt_2.svg";
import shirt_3 from "assets/image/shirt_3.svg";
import shirt_4 from "assets/image/shirt_4.svg";
import shirt_5 from "assets/image/shirt_5.svg";
import shirt_6 from "assets/image/shirt_6.svg";
import fram981 from "assets/image/frame981.png";
import TextDraw from "Components/Common/TextDraw";
import { FONT_STYLE } from "data/font";

const DetailMenu = ({
  item,
  setColor,
  setDragCurrent,
  setCurrentProduct,
  select,
  setSelect,
  setTypePro
}) => {
  const [body, setBody] = useState();

  const [listImage, setListImage] = useState([]);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    let images = [];
    for (var i = 1067; i < 1080; i++) {
      images.push({ id: i, src: `../../assets/artwork/${i}.png` });
    }
    setListImage(images);
  }, []);

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    console.log(base64)
    setImgSrc(base64)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  useEffect(() => {
    switch (item.id) {
      case 1:
        setBody(
          <div className="grid grid-cols-3 gap-3">
            {LIST_TYPE_LAYOUT.map((item, index) => (
              <div
                key={index}
                className=" cursor-pointer"
                onClick={() => {
                  setCurrentProduct(item.image);
                  setTypePro(item.name);
                }}
              >
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
              {LIST_MATERIALS.map((item, index) => (
                <div key={index} onClick={() => setSelect(item)} className="cursor-pointer">
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
                      className="w-4 h-4 mr-1 text-sm first:ml-1 rounded-full"
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
      case 3:
        setBody(
          <div className="grid grid-cols-2 gap-1">
            {FONT_STYLE.map((font, index) => (
              <TextDraw 
              {...font} 
              key={index}
              draggable={true} 
              onDragStart={(e) => {
                if (font.otherText) {
                  setDragCurrent({...font, type: "text", width: e.target.children[0].clientWidth, height: e.target.children[0].clientHeight, otherText:{...font.otherText, width: e.target.children[1].clientWidth, height: e.target.children[1].clientHeight} });
                } else {
                  setDragCurrent({...font, type: "text", width: e.target.clientWidth, height: e.target.clientHeight});
                }  
              }}
              >

              </TextDraw>
            ))}
          </div>
        );
        return;
      case 4:
        setBody(
          <div className="grid grid-cols-2 gap-1">
            {listImage && listImage.map((item, index) => {
              return (
              <div className="cursor-pointer" key={index}>
                <img 
                src={item.src} 
                alt="item" 
                draggable="true"
                onDragStart={(e) => {
                  setDragCurrent({...item, useDefault: true, type: "artwork"});
                  // dragUrl.current = e.target.src;
                }}
               ></img>
              </div>
            )})}
          </div>
        );
        return;
      case 5:
        setBody(
          <div>
            <div className="p-2">
              <input
                  id="originalFileName"
                  type="file"
                  inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
                  required
                  label="Document"
                  name="originalFileName"
                  onChange={e => handleFileRead(e)}
                  size="small"
                  variant="standard"
                />
            </div>
            <img src={imgSrc} alt="" draggable="true"
                onDragStart={(e) => {
                  setDragCurrent({id: new Date().getTime(), src: imgSrc, height:e.target.clientHeight, width: e.target.clientWidth, type: "artwork"});
                  // dragUrl.current = e.target.src;
                }}
              ></img>
          </div>
        );
        return;
      default:
        return;
    }

    // eslint-disable-next-line
  }, [select, listImage, imgSrc]);

  return (
    <div className="h-auto max-h-64 overflow-auto">
      {body ? body : "No data"}
    </div>
  );
};

export default DetailMenu;
const LIST_TYPE_LAYOUT = [
  {
    id: 1,
    name: "Cổ tròn tay dài",
    icon: shirt_1,
    image: "assets/ao3.png",
  },
  {
    id: 2,
    name: "Cổ tròn tay ngắn",
    icon: shirt_2,
    image: "assets/ao4.png",
  },
  {
    id: 3,
    name: "Hoodie tay ngắn",
    icon: shirt_3,
    image: "assets/ao5.png",
  },
  {
    id: 4,
    name: "Cổ bẻ tay ngắn",
    icon: shirt_4,
    image: "assets/ao6.png",
  },
  {
    id: 5,
    name: "Hoodie tay dài",
    icon: shirt_5,
    image: "assets/ao7.png",
  },
  {
    id: 6,
    name: "Cổ tròn tay ngắn nữ",
    icon: shirt_6,
    image: "assets/ao8.png",
  },
];
const LIST_MATERIALS = [
  {
    id: 1,
    desc: "95% cotton, 5% spandex95% cotton, 5% spandex",
    color: ["#FFA600", "#9C071E", "#7BA37D"],
  },
  {
    id: 2,
    desc: "65% cotton, 15% spandex95% cotton, 20% spandex",
    color: ["#A6D7FF", "#9c071e", "#f44c73"],
  },
];
