import { GeometryNodeInput } from "../types";
import { styled } from "styled-components";
import Stack from "./Stack";
import { CSSProperties } from "react";

const INPUT_BORDER_RADIUS = '3px';

type NodeSocketValueContainerProps = {
  first: boolean;
  last: boolean;
}

const NodeSocketValueContainer = styled.div<NodeSocketValueContainerProps>((props) => ({
  display: "flex",
  fontSize: "12px",
  padding: "4px 12px",
  backgroundColor: "#545454",
  borderColor: "#3D3D3D",
  borderStyle: "solid",
  borderWidth: "1px",
  borderTopWidth: props.first ? "1px": 0,
  borderTopLeftRadius: props.first ? INPUT_BORDER_RADIUS : 0,
  borderTopRightRadius: props.first ? INPUT_BORDER_RADIUS : 0,
  borderBottomLeftRadius: props.last ? INPUT_BORDER_RADIUS : 0,
  borderBottomRightRadius: props.last ? INPUT_BORDER_RADIUS : 0,
}))

type NodeSocketValueProps = {
  socketValue: GeometryNodeInput["default_value"]
}

export default function NodeSocketValue({socketValue}:NodeSocketValueProps) {
  
  let content: JSX.Element | JSX.Element[] = <div></div>;
  if(typeof(socketValue) === "object") {
    const socketLoop = Object.entries(socketValue);
    content = socketLoop.map(([key, value], index) => {
      return <NodeSocketValueContainer key={key} first={index === 0} last={index === socketLoop.length - 1}>{key}: {value}</NodeSocketValueContainer>
    }) 
  }
  if(Array.isArray(socketValue)) {
    content = socketValue.map((value, index) => (
      <NodeSocketValueContainer first={index === 0} last={index === socketValue.length - 1}>{value}</NodeSocketValueContainer>
    ))
  }
  if(typeof(socketValue) === "string") {
    content = <NodeSocketValueContainer first last>{socketValue}</NodeSocketValueContainer>
  }


  return(
    <Stack alignSelf="stretch">
      {content}
    </Stack>
  )
}