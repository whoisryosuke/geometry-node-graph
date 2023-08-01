import { Handle, Position } from "reactflow";
import { GeometryNodeData } from "./types";

const HEADER_SIZE = 35;
const HANDLE_SPACING = 22;

type Props = {
  data: GeometryNodeData;
};

export default function TextUpdaterNode({ data }: Props) {
  console.log("node data", data);

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.outputs.map((input) => (
              <div
                key={input.identifier}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {input.name}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.inputs.map((input) => (
              <div key={input.identifier} style={{ display: "flex" }}>
                {input.name}
              </div>
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
