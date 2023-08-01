import { useState } from 'react'
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import data from "./data/Test-nodes-53.json"
import 'reactflow/dist/style.css';


// Convert Blender format to ReactFlow
const nodes = data.nodes.map(node => ({
  id: node.uuid,
  position: node.location,
  data: {
    label: node.name
  }
}))

const edges = data.links.map(link => {
  const hash = Number(new Date).toString(36)

  return {
    id: hash,
    source: link.from_node,
    target: link.to_node,
  }
})

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
