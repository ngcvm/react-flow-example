import React from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = { left: 10 };
function OInputNode({ type, data }) {
  const onChange = React.useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const handleOnclick = () => {
    console.log("Custom node clicked!!!");
  };

  return (
    <div onClick={handleOnclick}>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          width: "8rem",
          textAlign: "center",
        }}
      >
        <p htmlFor="text">Overrided Input node</p>
        <p>{type}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
}

export default OInputNode;
