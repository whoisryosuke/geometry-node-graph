import { Handle, Position } from "reactflow";
import { GeometryNodeData } from "../types";
import { CSSProperties, useState } from "react";
import { SOCKET_STYLES, SOCKET_TYPES } from "../constants/sockets";
import { NODE_INPUT_TYPES, SOCKET_COLORS } from "../constants/colors";
import AccordionIcon from "./AccordionIcon";
import NodeSocketLabel from "./NodeSocketLabel";
import styled from "styled-components";
import Stack from "./Stack";

const getSocketLength = (socketValue: GeometryNodeData['inputs'][0]['default_value']) => {
  let socketLength = 0;
  if(socketValue && typeof(socketValue) === "object") {
    const socketLoop = Object.values(socketValue);
    socketLength = socketLoop.length;
  }
  if(Array.isArray(socketValue)) {
    socketLength = socketValue.length;
  }
  if(typeof(socketValue) === "string") {
    socketLength = 1;
  }
  return socketLength;
}

const HEADER_SIZE = 35;
const HANDLE_SPACING = 22;
const INPUT_SPACING = 28;
const HANDLE_COLLAPSED = 12;

type NodeContainerProps = {
  width: CSSProperties['width'];
  minHeight: CSSProperties['minHeight'];
}

const NodeContainer = styled.div<NodeContainerProps>((props) => ({
  width: props.width,
  minHeight: props.minHeight,
  backgroundColor: "#303030",
  borderRadius: 6,
  boxShadow: "0px 4px 5px 1px rgba(0, 0, 0, 0.25)",
}))

type NodeHeaderProps = {
  backgroundColor: CSSProperties['backgroundColor'];
}

const NodeHeader = styled.div<NodeHeaderProps>((props) => ({
  width: props.backgroundColor,
  color: "#E5E5E5",
  fontSize: "12px",
  padding: "2px 4px",
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
}))

type Props = {
  data: GeometryNodeData;
};

export default function TextUpdaterNode({ data }: Props) {
  const [expanded, setExpanded] = useState(true);
  // Get the height of outputs
  // The spacing of the labels
  const outputLabelSpacing = data.outputs.length * HANDLE_SPACING;
  // The spacing of any inputs
  const outputInputSpacing = data.outputs.reduce((total,_, index) => {
    // Get the previous socket's inputs to see how much space it took up
    // This sucks I know - blame react-flow for absolute positioning handles
    const socketValue = data.outputs?.[index - 1]?.default_value ?? null;
    const socketLength = getSocketLength(socketValue);
    const verticalSpacing = INPUT_SPACING * socketLength;

    return total + verticalSpacing;
  }, 0)
  const inputTopMargin = outputLabelSpacing + outputInputSpacing

  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };

  let inputVerticalSpacing = 0;
  let outputVerticalSpacing = 0;

  return (
    <>
      {data.inputs.map((input, index) => {
        // Get the previous socket's inputs to see how much space it took up
        // This sucks I know - blame react-flow for absolute positioning handles
        const socketValue = data.inputs?.[index - 1]?.default_value ?? null;
        const socketLength = getSocketLength(socketValue);
        const verticalSpacing = INPUT_SPACING * socketLength;
        inputVerticalSpacing = inputVerticalSpacing + verticalSpacing;
        console.log('vertical spacing', input.name, inputVerticalSpacing)
        return (
        <Handle
          key={input.identifier}
          type="target"
          position={Position.Left}
          style={{
            ...SOCKET_STYLES[input.display_shape as SOCKET_TYPES],
            backgroundColor: SOCKET_COLORS[input.type as NODE_INPUT_TYPES],
            borderColor: "#1B1B1B",
            top: expanded
              ? HEADER_SIZE + HANDLE_SPACING * index + inputTopMargin + inputVerticalSpacing
              : HANDLE_COLLAPSED,
          }}
          id={input.type}
        />
      )})}

      <NodeContainer
        width={data.width}
        minHeight={expanded ? data.height : "auto"}
      >
        <NodeHeader
            backgroundColor={data.use_custom_color
              ? `rgb(${data.color.r},${data.color.g},${data.color.b})`
              : "#1D725E"}
        >
          <button
            onClick={toggleExpanded}
            style={{ background: "transparent", padding: 0, marginRight: 4 }}
          >
            <AccordionIcon />
          </button>
          {data?.label ?? "Node"}
        </NodeHeader>

        {expanded && (
          <Stack>
            <Stack>
              {data.outputs.map((input) => (
                <NodeSocketLabel input={input} rightAlign />
              ))}
            </Stack>
            <Stack>
              {data.inputs.map((input) => (
                <NodeSocketLabel input={input} />
              ))}
            </Stack>
          </Stack>
        )}
      </NodeContainer>
      {data.outputs.map((input, index) => {
        // Get the previous socket's inputs to see how much space it took up
        // This sucks I know - blame react-flow for absolute positioning handles
        const socketValue = data.outputs?.[index - 1]?.default_value ?? null;
        const socketLength = getSocketLength(socketValue);
        const verticalSpacing = INPUT_SPACING * socketLength;
        outputVerticalSpacing = outputVerticalSpacing + verticalSpacing;
        return(
        <Handle
          key={input.identifier}
          type="source"
          position={Position.Right}
          style={{
            ...SOCKET_STYLES[input.display_shape as SOCKET_TYPES],
            backgroundColor: SOCKET_COLORS[input.type as NODE_INPUT_TYPES],
            borderColor: "#1B1B1B",
            top: expanded
              ? HEADER_SIZE + (HANDLE_SPACING * index) + outputVerticalSpacing
              : HANDLE_COLLAPSED,
          }}
          id={input.type}
        />
      )})}
    </>
  );
}
