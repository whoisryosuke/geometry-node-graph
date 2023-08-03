import { GeometryNodeInput } from "../types";

type NodeSocketValueProps = {
  socketValue: GeometryNodeInput["default_value"]
}

export default function NodeSocketValue({socketValue}:NodeSocketValueProps) {
  
  let content: JSX.Element | JSX.Element[] = <div></div>;
  if(typeof(socketValue) === "object") {
    content = Object.entries(socketValue).map(([key, value]) => {
      return <div key={key}>{key}: {value}</div>
    }) 
  }
  if(Array.isArray(socketValue)) {
    content = socketValue.map(value => (
      <div>{value}</div>
    ))
  }
  if(typeof(socketValue) === "string") {
    content = <div>{socketValue}</div>
  }


  return(
    <div>
      {content}
    </div>
  )
}