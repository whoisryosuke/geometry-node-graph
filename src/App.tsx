import { useState } from "react";
import NodeGraph from "./components/NodeGraph";
import defaultData from "./data/Tutorial-nodes-0.json";
import { GeometryNodeFile } from "./types";
import "reactflow/dist/style.css";
import UploadForm from "./components/UploadForm";

function App() {
  const [data, setData] = useState(null);

  const updateJson = (text: string) => {
    try {
      const json = JSON.parse(text);
      setData(json);
      console.log('got json', json)

    } catch(e) {
      console.error(`Couldn't parse that JSON`)
    }
  }


  return <>
    <NodeGraph data={data ?? defaultData} />
    <UploadForm updateJson={updateJson} />
  </>;
}

export default App;
