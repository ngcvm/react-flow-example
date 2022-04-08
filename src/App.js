import { useMemo, useState, useCallback } from "react";
import "./App.css";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Controls,
  Background,
} from "react-flow-renderer";
import CustomNode from "./nodes/CustomNode";
import OInputNode from "./nodes/OInputNode";
import YAML from "js-yaml";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    type: "textUpdater",
    data: { label: "Custom Node", test: "haha" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const nodeTypes = useMemo(() => ({ textUpdater: CustomNode }, { input: OInputNode }), []);
  const exportHandler = () => {
    const output = nodes.reduce((acc, node) => {
      return acc + "\n" + YAML.dump({
        flow: node.id,
        data: node.data,
      }, {
        flowLevel: 3,
        styles: {
          "!!int": "decimal",
          "!!null": "camelcase",
        },
      });
    }, '');
    console.log(output);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = "display:none";
    const blob = new Blob([output], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "flow.yml";
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant="lines" />
        <Controls />
      </ReactFlow>
      <button
        onClick={exportHandler}
        style={{ left: 0, top: 0, position: "absolute", zIndex: "999" }}
      >
        Export workflow
      </button>
    </div>
  );
}

export default App;
