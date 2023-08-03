import { GeometryNodeInput } from "../types";
import NodeSocketValue from "./NodeSocketValue";

type NodeSocketLabelProps = {
  input: GeometryNodeInput;
  rightAlign?: boolean;
};

export default function NodeSocketLabel({ input, rightAlign }: NodeSocketLabelProps) {
  return (
    <div
      key={input.identifier}
      style={{
        display: "flex",
        fontSize: "12px",
        padding: "2px 8px",
        justifyContent: rightAlign ? "flex-end" : "flex-start",
      }}
    >
      {input.name}
      {input.default_value && <NodeSocketValue socketValue={input.default_value} />}
    </div>
  );
}