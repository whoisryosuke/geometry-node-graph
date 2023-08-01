import { Handle, Position } from "reactflow";
import { GeometryNodeData, GeometryNodeInput } from "./types";

const HEADER_SIZE = 35;
const HANDLE_SPACING = 22;

type Props = {
  data: GeometryNodeData;
};

type NodeSocketLabelProps = {
  input: GeometryNodeInput
  rightAlign?: boolean,
}

function NodeSocketLabel({input, rightAlign}:NodeSocketLabelProps) {
  return (
    <div key={input.identifier} style={{ display: "flex", fontSize: '12px', padding:'2px 8px', justifyContent: rightAlign ? "flex-end" : "flex-start" }}>
      {input.name}
    </div>
  )
}

export default function TextUpdaterNode({ data }: Props) {
  const inputTopMargin = data.outputs.length * HANDLE_SPACING;

  return (
    <>
      {data.inputs.map((input, index) => (
        <Handle
          key={input.identifier}
          type="target"
          position={Position.Left}
          style={{ top: HEADER_SIZE + HANDLE_SPACING * index + inputTopMargin }}
          id={input.type}
        />
      ))}

      <div
        style={{
          width: data.width,
          minHeight: data.height,
          backgroundColor: "#303030",
          borderRadius: 6,
          boxShadow: "0px 4px 5px 1px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            backgroundColor: data.use_custom_color ? `rgb(${data.color.r},${data.color.g},${data.color.b})` : "#1D725E",
            color: "#E5E5E5",
            fontSize: "12px",
            padding: "2px 4px",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          {data?.label ?? "Node"}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.outputs.map((input) => (
              <NodeSocketLabel input={input} rightAlign />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.inputs.map((input) => (
              <NodeSocketLabel input={input} />
            ))}
          </div>
        </div>
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
