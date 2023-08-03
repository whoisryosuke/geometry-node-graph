import { CSSProperties } from "react";
import { styled } from "styled-components";

type StackProps = {
  flexDirection?: CSSProperties['flexDirection'];
  alignSelf?: CSSProperties['alignSelf'];
}

const Stack = styled.div<StackProps>((props) => ({
  flexDirection: props.flexDirection ?? "column",
  alignSelf: props.alignSelf ?? "inherit",
  display: "flex",
}))

export default Stack