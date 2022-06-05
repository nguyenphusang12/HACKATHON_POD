import React from "react";
import { Transformer, Text as KonvaText } from "react-konva";

const Text = ({ shapeProps, isSelected, onSelect, onChange, pageRef }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    React.useEffect(() => {
      if (isSelected) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
    const handleChangeText = () => {
        trRef.current.hide()
        shapeRef.current.hide()
        var textPosition = shapeRef.current.absolutePosition();
        const stage = document.getElementById("page-container")
        var areaPosition = {
            x: stage.getBoundingClientRect().x + textPosition.x,
            y: stage.getBoundingClientRect().y + textPosition.y,
          };
          
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        textarea.value = shapeRef.current.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = shapeRef.current.width() - shapeRef.current.padding() * 2 + 'px';
        textarea.style.height =
          shapeRef.current.height() - shapeRef.current.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = shapeRef.current.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = shapeRef.current.lineHeight();
        textarea.style.fontFamily = shapeRef.current.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = shapeRef.current.align();
        textarea.style.color = shapeRef.current.fill();
        var rotation = shapeRef.current.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }
        var px = 0;
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            shapeRef.current.show();
            trRef.current.show();
            trRef.current.forceUpdate();
          }

          function setTextareaWidth(newWidth) {
            if (!newWidth) {
              // set width for placeholder
              newWidth = shapeRef.current.placeholder.length * shapeRef.current.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
              navigator.userAgent
            );
            var isFirefox =
              navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
              newWidth = Math.ceil(newWidth);
            }
  
            var isEdge =
              document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
              newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
          }

          textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
              shapeRef.current.text(textarea.value);
              removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
              removeTextarea();
            }
          });
  
          textarea.addEventListener('keydown', function (e) {
            var scale = shapeRef.current.getAbsoluteScale().x;
            setTextareaWidth(shapeRef.current.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
              textarea.scrollHeight + shapeRef.current.fontSize() + 'px';
          });

          function handleOutsideClick(e) {
            if (e.target !== textarea) {
              shapeRef.current.text(textarea.value);
              removeTextarea();
            }
          }

          setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
          });
          
    }

    return (
        <>
        <React.Fragment>
        <KonvaText
          onClick={
              (e) => {
                pageRef.current = e.target
                onSelect()
              }
              
            }
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
            node.fontSize(scaleX * node.fontSize());
            node.scale({x: 1, y:1})
            onChange({
              ...shapeProps,
              fontSize: node.fontSize(),
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}

          onDblClick={handleChangeText}
          onDblTap={handleChangeText}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            keepRatio
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </React.Fragment>
        </>
      
    );
  };

  export default Text