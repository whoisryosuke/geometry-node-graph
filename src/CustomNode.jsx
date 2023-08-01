import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { top: 30 };

export default function TextUpdaterNode({ data }) {

  console.log('node data', data)

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div style={{backgroundColor: '#303030', borderRadius: 6}}>
        <div style={{
            backgroundColor: "#1D725E",
            color: "#E5E5E5",
            fontSize: '12px', 
            padding: "2px 4px"
        }}>{data?.label ?? "Node"}</div>
        <div>
            Nodes
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Right} id="b" style={handleStyle} />
    </>
  );
}