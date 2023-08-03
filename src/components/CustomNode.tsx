import { Handle, Position } from "reactflow";
import { GeometryNodeData } from "../types";
import { useState } from "react";
import { SOCKET_STYLES, SOCKET_TYPES } from "../constants/sockets";
import { NODE_INPUT_TYPES, SOCKET_COLORS } from "../constants/colors";
import AccordionIcon from "./AccordionIcon";
import NodeSocketLabel from "./NodeSocketLabel";

const HEADER_SIZE = 35;
const HANDLE_SPACING = 22;
const HANDLE_COLLAPSED = 12;

type Props = {
  data: GeometryNodeData;
};

export default function TextUpdaterNode({ data }: Props) {
  const [expanded, setExpanded] = useState(true);
  const inputTopMargin = data.outputs.length * HANDLE_SPACING;

  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <>
      {data.inputs.map((input, index) => (
        <Handle
          key={input.identifier}
          type="target"
          position={Position.Left}
          style={{
            ...SOCKET_STYLES[input.display_shape as SOCKET_TYPES],
            backgroundColor: SOCKET_COLORS[input.type as NODE_INPUT_TYPES],
            borderColor: "#1B1B1B",
            top: expanded
              ? HEADER_SIZE + HANDLE_SPACING * index + inputTopMargin
              : HANDLE_COLLAPSED,
          }}
          id={input.type}
        />
      ))}

      <div
        style={{
          width: data.width,
          minHeight: expanded ? data.height : "auto",
          backgroundColor: "#303030",
          borderRadius: 6,
          boxShadow: "0px 4px 5px 1px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            backgroundColor: data.use_custom_color
              ? `rgb(${data.color.r},${data.color.g},${data.color.b})`
              : "#1D725E",
            color: "#E5E5E5",
            fontSize: "12px",
            padding: "2px 4px",
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        >
          <button
            onClick={toggleExpanded}
            style={{ background: "transparent", padding: 0, marginRight: 4 }}
          >
            <AccordionIcon />
          </button>
          {data?.label ?? "Node"}
        </div>

        {expanded && (
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
        )}
      </div>
      {data.outputs.map((input, index) => (
        <Handle
          key={input.identifier}
          type="source"
          position={Position.Right}
          style={{
            ...SOCKET_STYLES[input.display_shape as SOCKET_TYPES],
            backgroundColor: SOCKET_COLORS[input.type as NODE_INPUT_TYPES],
            borderColor: "#1B1B1B",
            top: expanded
              ? HEADER_SIZE + HANDLE_SPACING * index
              : HANDLE_COLLAPSED,
          }}
          id={input.type}
        />
      ))}
    </>
  );
}
