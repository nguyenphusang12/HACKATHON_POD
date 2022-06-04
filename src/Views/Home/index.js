import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import ItemMenu from "Components/ItemMenu";
import ArkworkImage from "Components/KonvaObject/ArkworkImage";
import shirtIcon from "assets/image/Shape.png";
import textIcon from "assets/image/Shape_3.png";
import layoutIcon from "assets/image/Union.png";
import colorIcon from "assets/image/Shape_1.png";
import uploadIcon from "assets/image/Shape_4.png";
import downloadIcon from "assets/image/Shape_5.png";
import DetailMenu from "Components/DetailMenu";
import { CirclePicker } from 'react-color';
import html2canvas from "html2canvas";
const initialRectangles = [
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
];
const LIST_BUTTONS_CONTROL = [
  {
    id: 1,
    title: "Kiểu dáng",
    icon: shirtIcon,
    isShow: false,
  },
  {
    id: 2,
    title: "Chất liệu và màu sắc",
    isShow: false,
    icon: colorIcon,
  },
  {
    id: 3,
    title: "Thêm chữ",
    isShow: false,
    icon: layoutIcon,
  },
  {
    id: 4,
    title: "Chọn mẫu thiết kế",
    isShow: false,
    icon: textIcon,
  },
  {
    id: 5,
    title: "Tải thiết kế lên",
    isShow: false,
    icon: uploadIcon,
  },
  {
    id: 6,
    title: "Tải về máy",
    isShow: false,
    icon: downloadIcon,
  },
];
const Home = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  const [width, setWidth] = useState(700);
  const [height, setHeight] = useState(685);
  const [color, setColor] = useState("red");
  const [listButtons, setListButtons] = useState(LIST_BUTTONS_CONTROL);
  const [listImage, setListImage] = useState([]);
  const [listImageDesign, setListImageDesign] = useState([]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const handleClickMenu = (id) => {
    listButtons.some((item) => {
      if (item.id === id) {
        item.isShow = !item.isShow;
        setListButtons([...listButtons]);
      }
      return item.id === id;
    });
  };

  useEffect(() => {
    let images = []
    for (var i=1067; i<1069; i++) {
      const imageObj = new Image();
      imageObj.src = `../../assets/artwork/${i}.png`
      images.push({id: i, image: imageObj, width: 150, height: 150, x: 200, y: 300})
    }
    setListImage(images);
  }, [])
 
  const handleChangeColor = (color) => {
    setColor(color.hex);
  };

  const handleDownload = () => {
    html2canvas(document.querySelector("#design-container")).then(canvas => {
      const image = canvas.toDataURL("image/png", 1.0)
      downloadImage(image, "design")
  });
};

const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    
    fakeLink.href = blob;
    
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    
    fakeLink.remove();
  };
  return (
    <div className="flex w-full">
      <div className="flex w-1/4">
        <div className="w-11/12 mx-auto px-2">
          {listButtons.map((item, index) => (
            <>
              <ItemMenu
                key={index}
                title={item.title}
                icon={item.icon}
                handleClickMenu={index === 5 ? handleDownload : handleClickMenu}
                item={item}
                listImage={listImage}
              />
              {item.isShow && <DetailMenu item={item} setColor={setColor}/>}
            </>
          ))}
        </div>
      </div>
      <div id="design-container" className="w-1/2 overflow-hidden shadow-sm shadow-neutral-500 relative">

         <div style={{ width: '100%'}}>
            <img className="object-cover" alt="" style={{top: 0, left: 0, width: width, background: color }} src="assets/ao3.png"/>
        </div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ position: "absolute", top: 0, left: 0 }}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {listImage.map((image, i) => {
              return (<ArkworkImage
              key={i}
              shapeProps={image}
              isSelected={image.id === selectedId}
              onSelect={() => {
                selectShape(image.id);
              }}
            onChange={(newAttrs) => {
              const images = listImage.slice();
              images[i] = newAttrs;
              setListImage(images);
            }}
            />)
            })}
            
          </Layer>
        </Stage>
      </div>
      <div className="w-1/4 px-3">
        <div className="text-left w-full h-4/5 px-3">
          <h2 className="text-lg text-center font-bold p-2">Thuộc tính áo</h2>
          <hr />
          <div className="py-3">
            <div className="">- Áo bóng chày </div>
            <div className="">- Loại vải: 95% cotton, 5% spandex</div>
            <div className="">- Loại in: DTF / Decal đa sắc</div>
            <div className="font-bold"> Nhập số lượng áo theo Size:</div>
            <div className="grid grid-cols-3 gap-4">
              {LIST_SIZE.map((item, index) => (
                <div key={index} className="">
                  <div className="mb-1">{item}</div>
                  <div className="w-full rounded border-[1px] border-gray-300">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-full px-1 outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const LIST_SIZE = ["XS", "S", "M", "L", "XXl", "XXXl"];

