import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { top: 30 };
const HEADER_SIZE = 30;
const HANDLE_SPACING = 20;

export default function TextUpdaterNode({ data }) {
  console.log("node data", data);

  return (
    <>
      {data.inputs.map((input, index) => (
        <Handle
          key={input.identifier}
          type="target"
          position={Position.Left}
          style={{ top: HEADER_SIZE + HANDLE_SPACING * index }}
          id={input.type}
        />
      ))}

      <div
        style={{
          width: data.width,
          height: data.height,
          backgroundColor: "#303030",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            backgroundColor: "#1D725E",
            color: "#E5E5E5",
            fontSize: "12px",
            padding: "2px 4px",
          }}
        >
          {data?.label ?? "Node"}
        </div>
        <div>{/* Nodes */}</div>
      </div>
      {data.outputs.map((input, index) => (
        <Handle
          key={input.identifier}
          type="source"
          position={Position.Right}
          style={{ top: HEADER_SIZE + HANDLE_SPACING * index }}
          id={input.type}
        />
      ))}
    </>
  );
}
