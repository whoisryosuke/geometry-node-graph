import { GeometryNodeInput } from "../types";
import { styled } from "styled-components";
import Stack from "./Stack";


const NodeSocketValueContainer = styled.div({
  display: "flex",
  fontSize: "12px",
  padding: "2px 8px",
  
})
type NodeSocketValueProps = {
  socketValue: GeometryNodeInput["default_value"]
}

export default function NodeSocketValue({socketValue}:NodeSocketValueProps) {
  
  let content: JSX.Element | JSX.Element[] = <div></div>;
  if(typeof(socketValue) === "object") {
    content = Object.entries(socketValue).map(([key, value]) => {
      return <NodeSocketValueContainer key={key}>{key}: {value}</NodeSocketValueContainer>
    }) 
  }
  if(Array.isArray(socketValue)) {
    content = socketValue.map(value => (
      <NodeSocketValueContainer>{value}</NodeSocketValueContainer>
    ))
  }
  if(typeof(socketValue) === "string") {
    content = <NodeSocketValueContainer>{socketValue}</NodeSocketValueContainer>
  }


  return(
    <Stack>
      {content}
    </Stack>
  )
}