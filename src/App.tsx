import NodeGraph from "./components/NodeGraph";
import data from "./data/Tutorial-nodes-3.json";
import { GeometryNodeFile } from "./types";
import "reactflow/dist/style.css";

function App() {
  return <NodeGraph data={data as GeometryNodeFile} />;
}

export default App;
