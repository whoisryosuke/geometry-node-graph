import { CSSProperties } from "react";
import { GeometryNodeInput } from "../types";
import NodeSocketValue from "./NodeSocketValue";
import { styled } from "styled-components";

type NodeSocketLabelContainerProps = {
  justifyContent: CSSProperties['justifyContent'];
}

const NodeSocketLabelContainer = styled.div<NodeSocketLabelContainerProps>((props) => ({
  justifyContent: props.justifyContent,
  display: "flex",
  fontSize: "12px",
  padding: "2px 8px",
}))

type NodeSocketLabelProps = {
  input: GeometryNodeInput;
  rightAlign?: boolean;
};

export default function NodeSocketLabel({ input, rightAlign }: NodeSocketLabelProps) {
  return (
    <NodeSocketLabelContainer
      key={input.identifier}
      justifyContent={ rightAlign ? "flex-end" : "flex-start"}
    >
      {input.name}
      {input.default_value && <NodeSocketValue socketValue={input.default_value} />}
    </NodeSocketLabelContainer>
  );
}