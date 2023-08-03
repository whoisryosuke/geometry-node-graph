import { CSSProperties } from "react";
import { styled } from "styled-components";

type StackProps = {
  flexDirection?: CSSProperties['flexDirection'];
}

const Stack = styled.div<StackProps>((props) => ({
  flexDirection: props.flexDirection ?? "column",
  display: "flex",
}))

export default Stack