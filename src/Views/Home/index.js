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
import Text from "Components/KonvaObject/Text";


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
  const [listImageDesign, setListImageDesign] = useState([]);
  const stageRef = React.useRef();
  const containerRef = React.useRef();;
  const [dragCurrent, setDragCurrent] = useState(null);
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      containerRef.current = null;
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

  const handleDeleteArtwork = () => {
    const images = listImageDesign.filter(x => x.id != selectedId);
    setListImageDesign(images)
  }

  const handleChangeFont = () => {
    
  }
  
  const handleDragArtwork = () => {
    console.log(dragCurrent)
    switch (dragCurrent.type) {
      case "text":
       let texts = listImageDesign.concat([
          {
            id: new Date().getTime(),
            ...stageRef.current.getPointerPosition(),
            ...dragCurrent,
            type: "text"
          },
        ])
        if (dragCurrent.otherText) {
          texts = texts.concat(
            [
              {
                id: new Date().getTime() + 1,
                x: stageRef.current.getPointerPosition().x,
                y: stageRef.current.getPointerPosition().y + dragCurrent.fontSize + 5,
                ...dragCurrent.otherText,
                type: "text"
              },
            ]
          )
        }
        setListImageDesign(
          texts
        );
        return;
      case "artwork":
        setListImageDesign(
          listImageDesign.concat([
            {
              id: new Date().getTime(),
              ...stageRef.current.getPointerPosition(),
              width: 150,
              height: 150,
              src: dragCurrent.src,
              type: "artwork"
            },
          ])
        );
        return;
      default:
        return;
    }

    
  }
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
                />
              {item.isShow && <DetailMenu item={item} setColor={setColor} setDragCurrent={setDragCurrent}/>}
            </>
          ))}
        </div>
      </div>
      <div id="design-container" className="w-1/2 overflow-hidden  relative">

         <div style={{ width: '100%'}}>
            <img alt="" style={{top: 0, left: 0, width: width, background: color }} src="assets/ao3.png"/>
        </div>
        <div
          id="page-container" 
          style={{ position: "absolute", top: 0, left: 0, width:'100%'}}
           onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image

            handleDragArtwork()
          }}
          onDragOver={(e) => e.preventDefault()}
        >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={stageRef}
        >



          <Layer>
            {listImageDesign.map((item, i) => {
               switch (item.type) {
                case "text":
                  return (
                    <Text
                    key={i}
                    pageRef={containerRef}
                    shapeProps={{ ...item, fill: item.color }}
                    isSelected={item.id === selectedId}
                    onSelect={() => {
                      selectShape(item.id);
                    }}
                    onChange={(newAttrs) => {
                    const images = listImageDesign.slice();
                    images[i] = newAttrs;
                    setListImageDesign(images);
                  }}
                  />)
                case "artwork":
                  return (
                    <ArkworkImage
                    key={i}
                    shapeProps={item}
                    isSelected={item.id === selectedId}
                    onSelect={() => {
                      selectShape(item.id);
                    }}
                  onChange={(newAttrs) => {
                    const images = listImageDesign.slice();
                    images[i] = newAttrs;
                    setListImageDesign(images);
                  }}
                  />)
                default:
                  return <></>;
              }
              
            })}
            
            
          </Layer>
        </Stage>
        </div>
        <div className="absolute top-2 right-2 cursor-pointer" onClick={handleDeleteArtwork}>
            Delete
        </div>
        {
          selectedId !== null && 
          <div className="absolute top-2 left-4 cursor-pointer flex" onClick={handleChangeFont}>
            <div className="px-2 font-bold border-2 border-slate-50 bg-white text-black">B</div>
            <div className="px-2 italic border-2 border-slate-50 bg-white text-black">I</div>
            <div className="px-2 underline border-2 border-slate-50 bg-white text-black">U</div>
        </div>
        }
        
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
            <div className="w-full p-2 bg-sky-400 mt-3 rounded-md text-white text-center cursor-pointer active:bg-sky-500">Tính giá</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const LIST_SIZE = ["XS", "S", "M", "L", "XXl", "XXXl"];

