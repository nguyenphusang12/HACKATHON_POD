import React, { useEffect, useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import ItemMenu from "Components/ItemMenu";
import ArkworkImage from "Components/KonvaObject/ArkworkImage";
import shirtIcon from "assets/image/Shape.png";
import textIcon from "assets/image/Shape_3.png";
import layoutIcon from "assets/image/Union.png";
import colorIcon from "assets/image/Shape_1.png";
import uploadIcon from "assets/image/Shape_4.png";
import downloadIcon from "assets/image/Shape_5.png";
import DetailMenu from "Components/DetailMenu";
import html2canvas from "html2canvas";
import Text from "Components/KonvaObject/Text";
import { FONTS } from "data/font";
import { useDispatch } from "react-redux";
import { setTitlePage, addProduct } from "Store";
import { toast } from "react-toastify";
import { getPrice } from "Api";

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
  const dispatch = useDispatch();
  const [selectedId, selectShape] = React.useState(null);
  const [color, setColor] = useState("");
  const [listButtons, setListButtons] = useState(LIST_BUTTONS_CONTROL);
  const [listImageDesign, setListImageDesign] = useState([]);
  const stageRef = React.useRef();
  const containerRef = React.useRef();
  const [dragCurrent, setDragCurrent] = useState(null);
  const [fontSelected, setFontSelected] = useState("Roboto");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUndeline] = useState(false);
  const [position, setPositon] = useState("left");
  const [currentProduct, setCurrentProduct] = useState("assets/ao3.png");
  const [select, setSelect] = useState();
  const [typePr, setTypePro] = useState();
  const [qualitySize, setQualitySize] = useState({});
  const [amount, setAmount] = useState({});
  const props = useRef({
    image: "",
    type: "",
    price: null,
  });
  const handleChangeQuality = (e) => {
    setQualitySize({ ...qualitySize, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    props.current = {
      ...props.current,
      image: currentProduct,
      type: select?.desc,
      ...qualitySize,
      name: typePr,
      value: Object.values(qualitySize).reduce(
        (pre, cur) => pre + Number(cur),
        0
      ),
    };
  }, [currentProduct, select, qualitySize, typePr]);
  useEffect(() => {
    const run = async () => {
      const params = {
        productId: 1,
        sizeQuantity: {
          ...qualitySize,
        },
        color: color,
        printCondition: {
          front: 1,
        },
      };

      try {
        const res = await getPrice(params);
        setAmount({ ...res.data });
      } catch (error) {}
    };
    run();
  }, [qualitySize, color]);
  const addProductToCart = () => {
    toast("Thêm giỏ hàng thành công!");
    dispatch(addProduct(props.current));
  };
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

  const handleDownload = () => {
    html2canvas(document.querySelector("#download-image")).then((canvas) => {
      const image = canvas.toDataURL("image/png", 1.0);
      downloadImage(image, "design");
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
    const images = listImageDesign.filter((x) => x.id !== selectedId);
    setListImageDesign(images);
    selectShape(null);
  };

  const handleChangeFont = () => {};
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      handleDeleteArtwork();
    }
  };
  const handleDragArtwork = () => {
    switch (dragCurrent.type) {
      case "text":
        let texts = listImageDesign.concat([
          {
            id: new Date().getTime(),
            ...stageRef.current.getPointerPosition(),
            ...dragCurrent,
            type: "text",
          },
        ]);
        if (dragCurrent.otherText) {
          texts = texts.concat([
            {
              id: new Date().getTime() + 1,
              x: stageRef.current.getPointerPosition().x,
              y:
                stageRef.current.getPointerPosition().y +
                dragCurrent.fontSize +
                5,
              ...dragCurrent.otherText,
              type: "text",
            },
          ]);
        }
        setListImageDesign(texts);
        return;
      case "artwork":
        setListImageDesign(
          listImageDesign.concat([
            {
              id: new Date().getTime(),
              ...stageRef.current.getPointerPosition(),
              width: dragCurrent.useDefault ? 150 : dragCurrent.width,
              height: dragCurrent.useDefault ? 150 : dragCurrent.height,
              src: dragCurrent.src,
              type: "artwork",
            },
          ])
        );
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    dispatch(setTitlePage("Thiết kế mẫu áo của bạn"));
  }, []);
  return (
    <div className="flex w-full">
      <div className="flex w-1/4">
        <div className="w-11/12 mx-auto px-2">
          {listButtons.map((item, index) => (
            <div key={index}>
              <ItemMenu
                title={item.title}
                icon={item.icon}
                handleClickMenu={index === 5 ? handleDownload : handleClickMenu}
                item={item}
              />
              {item.isShow && (
                <DetailMenu
                  setCurrentProduct={setCurrentProduct}
                  item={item}
                  setColor={setColor}
                  setDragCurrent={setDragCurrent}
                  select={select}
                  setSelect={setSelect}
                  setTypePro={setTypePro}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div id="design-container" className="w-1/2 overflow-hidden relative">
        <div id="download-image">
          <div style={{ width: "100%" }}>
            <img
              alt=""
              style={{ top: 0, left: 0, width: 700, background: color }}
              src={`${currentProduct}`}
            />
          </div>
          <div
            id="page-container"
            style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            onDrop={(e) => {
              e.preventDefault();
              // register event position
              stageRef.current.setPointersPositions(e);
              // add image

              handleDragArtwork();
            }}
            onDragOver={(e) => e.preventDefault()}
            onKeyDown={handleOnKeyDown}
            tabIndex={-1}
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
                          shapeProps={{
                            ...item,
                            fill: item.color,
                            fontStyle: item.fontWeight
                              ? item.fontWeight
                              : "normal",
                          }}
                          isSelected={item.id === selectedId}
                          onSelect={() => {
                            setFontSelected(containerRef.current.fontFamily());
                            setBold(
                              containerRef.current.fontStyle().includes("bold")
                            );
                            setItalic(
                              containerRef.current
                                .fontStyle()
                                .includes("italic")
                            );
                            setUndeline(
                              containerRef.current
                                .fontStyle()
                                .includes("underline")
                            );
                            selectShape(item.id);
                          }}
                          onChange={(newAttrs) => {
                            const images = listImageDesign.slice();
                            images[i] = newAttrs;
                            setListImageDesign(images);
                          }}
                        />
                      );
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
                        />
                      );
                    default:
                      return <div key={i}></div>;
                  }
                })}
              </Layer>
            </Stage>
          </div>
        </div>

        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleDeleteArtwork}
        >
          <i className="fa-solid fa-trash-can text-3xl"></i>
        </div>
        {selectedId !== null && (
          <div
            className="absolute top-2 left-4 cursor-pointer flex"
            onClick={handleChangeFont}
          >
            <div className="px-2 font-bold border-2 border-slate-50 bg-white text-black">
              <select
                defaultValue={fontSelected}
                onChange={(e) => {
                  setFontSelected(e.target.value);
                  containerRef.current.fontFamily(e.target.value);
                }}
              >
                {FONTS.map((x, index) => {
                  return (
                    <option key={index} value={x}>
                      {x}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              className="px-2 font-bold border-2 border-slate-50 bg-white text-black"
              style={{ background: bold ? "#CCC" : "#FFF" }}
              onClick={() => {
                setBold(!bold);
                bold
                  ? containerRef.current.fontStyle("normal")
                  : containerRef.current.fontStyle("bold");
              }}
            >
              B
            </div>
            <div
              className="px-2 italic border-2 border-slate-50 bg-white text-black"
              style={{ background: italic ? "#CCC" : "#FFF" }}
              onClick={() => {
                setItalic(!italic);
                italic
                  ? containerRef.current.fontStyle("normal")
                  : containerRef.current.fontStyle("italic");
              }}
            >
              I
            </div>
            <div
              className="px-2 underline border-2 border-slate-50 bg-white text-black"
              style={{ background: underline ? "#CCC" : "#FFF" }}
              onClick={() => {
                setUndeline(!underline);
                containerRef.current.fontStyle("underline");
              }}
            >
              U
            </div>
            <div
              className="px-2 font-bold border-2 border-slate-50 bg-white text-black"
              style={{ background: position === "left" ? "#CCC" : "#FFF" }}
              onClick={() => {
                setPositon(position === "left" ? "" : "left");
                containerRef.current.align("left");
              }}
            >
              <i className="fa-solid fa-align-left"></i>
            </div>
            <div
              className="px-2 font-bold border-2 border-slate-50 bg-white text-black"
              style={{ background: position === "center" ? "#CCC" : "#FFF" }}
              onClick={() => {
                setPositon(position === "center" ? "" : "center");
                containerRef.current.align("center");
              }}
            >
              <i className="fa-solid fa-align-center"></i>
            </div>
            <div
              className="px-2 font-bold border-2 border-slate-50 bg-white text-black"
              style={{ background: position === "right" ? "#CCC" : "#FFF" }}
              onClick={() => {
                setPositon(position === "right" ? "" : "right");
                containerRef.current.align("right");
              }}
            >
              <i className="fa-solid fa-align-right"></i>
            </div>
            <div
              className="px-2 font-bold border-2 border-slate-50 bg-white text-black"
              style={{ background: position === "justify" ? "#CCC" : "#FFF" }}
              onClick={() => {
                setPositon(position === "justify" ? "" : "justify");
                containerRef.current.align("justify");
              }}
            >
              <i className="fa-solid fa-align-justify"></i>
            </div>
          </div>
        )}
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
                      name={item}
                      id=""
                      onChange={handleChangeQuality}
                      className="w-full px-1 outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="my-2 text-lg font-bold border border-[#dbdbdb] border-t-0 border-l-0 border-r-0">
              Tổng cộng
            </div>
            <div className="flex justify-between my-1 ">
              <div className="">Tiền áo:</div>
              <div className="">{amount.basePrice}</div>
            </div>
            <div className="flex justify-between my-1">
              <div className="">Tiền in:</div>
              <div className="">{amount.printPrice}</div>
            </div>
            <div className="flex justify-between my-1">
              <div className="">Giảm giá:</div>
              <div className="">{amount.oldPrice - amount.salePrice}</div>
            </div>
            <div className="flex justify-between my-1">
              <div className="">Tổng cộng:</div>
              <div className="">{amount.salePrice}</div>
            </div>
            <div
              onClick={addProductToCart}
              className="w-full p-2 bg-sky-400 mt-3 rounded-md text-white text-center cursor-pointer active:bg-sky-500"
            >
              Thêm vào giỏ hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const LIST_SIZE = ["XS", "S", "M", "L", "XXl", "XXXl"];
