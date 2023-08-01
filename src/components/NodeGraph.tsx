import { useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  DefaultEdgeOptions,
  Edge,
  Node,
} from "reactflow";
import TextUpdaterNode from "./CustomNode";
import { GeometryNodeData, GeometryNodeFile } from "../types";
import { NODE_INPUT_TYPES, SOCKET_COLORS } from "../constants/colors";

const defaultEdgeOptions: DefaultEdgeOptions = {
  // animated: true,
};

type NodeGraphProps = {
  width?: string;
  height?: string;
  data: GeometryNodeFile;
};

function NodeGraph({
  width = "100vw",
  height = "100vh",
  data,
  ...props
}: NodeGraphProps) {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  // Convert Blender format to ReactFlow
  const nodes: Node<GeometryNodeData>[] = useMemo(
    () =>
      data.nodes.map((node) => ({
        id: node.uuid,
        position: node.location,
        type: "textUpdater",
        data: {
          label: node.name,
          width: node.width,
          height: node.height,
          inputs: node.inputs,
          outputs: node.outputs,
          color: node.color,
          selected: node.select,
          hide: node.hide,
          use_custom_color: node.use_custom_color,
        },
      })),
    [],
  );

  const edges: Edge[] = useMemo(
    () =>
      data.links.map((link) => {
        const hash = Number(new Date()).toString(36);

        return {
          id: hash,
          source: link.from_node,
          target: link.to_node,
          sourceHandle: link.from_socket.type,
          targetHandle: link.to_socket.type,

          style: {
            strokeWidth: 2,
            stroke: SOCKET_COLORS[link.from_socket.type as NODE_INPUT_TYPES],
          },
        };
      }),
    [],
  );

  return (
    <div style={{ width, height }} {...props}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default NodeGraph;
