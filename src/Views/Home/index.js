import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import ItemMenu from "Components/ItemMenu";
import shirtIcon from "assets/image/Shape.png";
import textIcon from "assets/image/Shape_3.png";
import layoutIcon from "assets/image/Union.png";
import colorIcon from "assets/image/Shape_1.png";
import uploadIcon from "assets/image/Shape_4.png";
import downloadIcon from "assets/image/Shape_5.png";
import DetailMenu from "Components/DetailMenu";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

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
    title: "Màu áo",
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

  const [listButtons, setListButtons] = useState(LIST_BUTTONS_CONTROL);

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
                handleClickMenu={handleClickMenu}
                item={item}
              />
              {item.isShow && <DetailMenu />}
            </>
          ))}
        </div>
      </div>
      <div className="w-1/2 overflow-hidden shadow-sm shadow-neutral-500">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
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
