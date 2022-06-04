import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import ItemMenu from "Components/ItemMenu";
import shirtIcon from "assets/image/polo-shirt.png";
import textIcon from "assets/image/text.png";
import layoutIcon from "assets/image/layout.png";
import colorIcon from "assets/image/color-palette.png";


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



const Home = () => {

  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex w-1/4">
        <div className="w-11/12 mx-auto py-3">
          <ItemMenu title="Kiểu dáng" icon={shirtIcon} />
          <ItemMenu title="Màu áo" icon={colorIcon} />
          <ItemMenu title="Mẫu thiết kế" icon={layoutIcon} />
          <ItemMenu title="Thêm chữ" icon={textIcon} />
          <ItemMenu title="Undo" icon={shirtIcon} />
          <ItemMenu title="Khôi phục cài đặt" icon={shirtIcon} />
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
      <div className="w-1/4 p-4">
        <div className="text-left w-full h-4/5 shadow-lg shadow-gray-500 p-3">
          <h2 className="text-lg text-center font-bold p-2">Thuộc tính áo</h2>
          <hr />
          <div className="">- Tên sản phẩm: </div>
          <div className="">- Loại vải: </div>
          <div className="">- Loại in: </div>
          <div className=""> Chọn size, số lượng:</div>
        </div>
      </div>
    </div>
  )
}

export default Home