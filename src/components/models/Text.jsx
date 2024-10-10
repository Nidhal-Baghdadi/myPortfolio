import React, {
  Children,
  createElement,
  forwardRef,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import { Text as TextMeshImpl } from "troika-three-text";
import { extend, useThree } from "@react-three/fiber";
import mergeRefs from "react-merge-refs";
import { useReflow } from "@react-three/flex";

// Extend react-three-fiber to use the TextMeshImpl object
extend({ TextMeshImpl });

// Default font URL
const defaultFont = `https://fonts.gstatic.com/s/raleway/v17/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao7CIPrcVIT9d0c8.woff`;

export const Text = forwardRef(
  (
    {
      anchorX = "left",
      anchorY = "top",
      textAlign = "left",
      children,
      maxWidth,
      ...props
    },
    ref
  ) => {
    const { invalidate } = useThree();
    const reflow = useReflow();
    const textRef = useRef();
    const [baseMtl, setBaseMtl] = useState();

    // Process children to extract text and nodes
    const [nodes, text] = useMemo(() => {
      let n = [];
      let t = "";
      Children.forEach(children, (child) => {
        if (typeof child === "string") {
          t += child;
        } else if (
          child &&
          typeof child === "object" &&
          child.props.attach === "material"
        ) {
          // Handle the base material
          n.push(
            createElement(child.type, {
              ref: setBaseMtl,
              attach: "material",
            })
          );
          if (baseMtl) {
            n.push(
              <primitive
                object={textRef.current.material}
                {...child.props}
                attach={null}
              />
            );
          }
        } else {
          n.push(child);
        }
      });
      return [n, t];
    }, [children, baseMtl]);

    // Trigger reflow and invalidate on layout changes
    useLayoutEffect(() => {
      textRef.current.sync(() => {
        reflow();
        invalidate();
      });
    });

    return (
      <textMeshImpl
        ref={mergeRefs([textRef, ref])}
        text={text}
        anchorX={anchorX}
        anchorY={anchorY}
        textAlign={textAlign}
        maxWidth={maxWidth}
        font={defaultFont}
        {...props}
      >
        {nodes}
      </textMeshImpl>
    );
  }
);

Text.displayName = "Text";
