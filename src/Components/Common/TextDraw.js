import React from "react";
import iconAdd from "assets/image/Shape_6.png";
import minusIcon from "assets/image/minus.svg";

const TextDraw = ( props ) => {
  return (
    <div style={{ 
        border: "1px solid #ccc",
     }} draggable={props.draggable} onDragStart={props.onDragStart}>
        <div style={{ 
        ...props,
        wordWrap: 'break-word',
        // width: width,
        height: "fit-content",
        cursor: "pointer",
         }}>
         {props.text}
         </div>
         {props.otherText && <div style={{ 
        ...props.otherText,
        wordWrap: 'break-word',
        // width: width,
        height: "fit-content",
        cursor: "pointer",
         }}>
         {props.otherText.text}
         </div> }
    </div>
    
  );
};

export default TextDraw;
