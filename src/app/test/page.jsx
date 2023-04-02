"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import CouplerNode, {
  defaultCouplerNodeData,
} from "../../components/nodes/coupler-node";
import OmniNode from "../../components/nodes/omni-node";
import HybridNode from "../../components/nodes/hybrid-node";
import FeederEdge, {defaultFeederEdgeData} from "../../components/edges/feeder-edge";
import PanelNode from "../../components/nodes/panel-node";
import FromBTSNode from "../../components/nodes/from-bts-node";

import SidePanel from "../../components/side-panel";

import useStore from "../../store";
import { shallow } from "zustand/shallow";

import { v4 as uuidv4 } from "uuid";

const flowKey = "current-flow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  viewport: state.viewport,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setViewport: state.setViewport,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});

const nodeTypes = {
  coupler: CouplerNode,
  omni: OmniNode,
  hybrid: HybridNode,
  panel: PanelNode,
  fromBTS: FromBTSNode,
};
const edgeTypes = {
  feeder: FeederEdge,
};

const defaultOmniNodeData = { omniId: "0" };
const defaultHybridNodeData = { hybridId: "C0" };
const defaultPanelNodeData = { panelId: "0" };
const defaultFromBTSNodeData = {};

function Page() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    viewport,
    setNodes,
    setEdges,
    setViewport,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  } = useStore(selector, shallow);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const data =
        type === "omni"
          ? defaultOmniNodeData
          : type === "coupler"
          ? defaultCouplerNodeData
          : type === "hybrid"
          ? defaultHybridNodeData
          : type === "panel"
          ? defaultPanelNodeData
          : type === "fromBTS"
          ? defaultFromBTSNodeData
          : { label: 0 };

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data,
      };

      addNode(newNode);
    },
    [reactFlowInstance]
  );

  const save = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log("saved to localStorage");
    }
  }, [reactFlowInstance]);

  const restore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        console.log("flow exist");
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  useEffect(() => {
    restore();
  }, []);

  useEffect(() => {
    save();
  }, [nodes, edges, viewport]);

  console.log({ nodes, edges });
  return (
    <ReactFlowProvider>
      <div className="flex flex-row w-screen h-screen bg-white">
        <SidePanel className="bg-gray-200 w-40 xl:w-72 h-screen text-black flex-shrink-0" />
        <div className="h-full w-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: "feeder", data: defaultFeederEdgeData }}
            minZoom={0.1}
            maxZoom={10}
          >
            <Controls />
            <Background color="#6F6F6F" variant="dots" />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default Page;
