import React, { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "reactflow";
import { getConnectedEdges } from "reactflow";

import { v4 as uuidv4 } from "uuid";

import useStore from "../../store";
import { shallow } from "zustand/shallow";
import { defaultCouplerNodeData } from "./coupler-node";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  addEdge: state.addEdge,
  updateNodeCouplerId: state.addEupdateNodeCouplerIddge,
  updateNodeCouplerLoss: state.updateNodeCouplerLoss,
  updateNodeOmniId: state.updateNodeOmniId,
  updateNodeHybridId: state.updateNodeHybridId,
  deselectNode: state.deselectNode,
});

function HybridNode(props) {
  const { id, data, xPos, yPos, ...rest } = props;
  const { edges, updateNodeHybridId } = useStore(selector, shallow);

  const connectedEdges = getConnectedEdges([props], edges);

  const isOutputOnePortConnected =
    connectedEdges.filter(
      (edge) => edge.source === id && edge.sourceHandle === "output1"
    ).length > 0;
  const isOutputTwoPortConnected =
    connectedEdges.filter(
      (edge) => edge.source === id && edge.sourceHandle === "output2"
    ).length > 0;
  // const isInputPortConnected =
  //   connectedEdges.filter(
  //     (edge) => edge.target === id && edge.targetHandle === "input"
  //   ).length > 0;

  return (
    <div className="relative h-9 w-14 border border-black">
      <div className="absolute top-9 right-0 left-0 flex flex-col items-center border text-black">
        <input
          className="nodrag w-14 bg-transparent text-center"
          type="text"
          value={data.hybridId}
          onChange={(e) => updateNodeHybridId(id, e.target.value)}
        />
        <div>3dB</div>
      </div>
      <svg viewBox="0 0 142 90" className="h-full w-full">
        <polyline
          points="0,10 20,10 122,80, 142,80"
          className="fill-current stroke-black stroke-[3px] text-white"
        />
        <polyline
          points="0,80 20,80 122,10, 142,10"
          className="fill-current stroke-black stroke-[3px] text-white"
        />
      </svg>
      <div className="absolute top-[25px] -left-2 h-2 w-2 bg-black"></div>
      <div className="text-1 absolute top-1 -left-10 scale-50 text-black">
        <p>50W</p>
        <p>Load</p>
      </div>

      {!isOutputOnePortConnected ? (
        <NodeToolbar position={Position.Right} className="-top-6">
          <button className="group flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-white text-xl text-black">
            +
            <div className="hidden group-hover:block">
              <AddMenu
                portType="output1"
                id={id}
                xPos={xPos}
                yPos={yPos}
                className="absolute bottom-0 left-0"
              />
            </div>
          </button>
        </NodeToolbar>
      ) : null}

      {!isOutputTwoPortConnected ? (
        <NodeToolbar position={Position.Right} className="top-6">
          <button className="group flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-white text-xl text-black">
            +
            <div className="hidden group-hover:block">
              <AddMenu
                portType="output2"
                id={id}
                xPos={xPos}
                yPos={yPos}
                className="absolute top-0 left-0"
              />
            </div>
          </button>
        </NodeToolbar>
      ) : null}
      <Handle
        type="target"
        id="input"
        position={Position.Left}
        className="top-1"
      />
      <Handle
        type="source"
        id="output1"
        position={Position.Right}
        className="top-1"
      />
      <Handle
        type="source"
        id="output2"
        position={Position.Right}
        className="top-[30px]"
      />
    </div>
  );
}

function AddMenu({ className, portType, xPos, yPos, id }) {
  const { addNode, addEdge, deselectNode } = useStore(selector, shallow);

  return (
    <div
      className={`grid h-48 w-48 grid-cols-3 grid-rows-3 gap-1 rounded-2xl border bg-white p-1 text-black ${className}`}
    >
      <button
        onClick={() => {
          const newNodeId = uuidv4();
          const newEdgeId = uuidv4();
          addNode({
            id: newNodeId,
            type: "coupler",
            position:
              portType === "output1"
                ? {
                    x: xPos + 250,
                    y: yPos - 150,
                  }
                : {
                    x: xPos + 250,
                    y: yPos + 150,
                  },
            data: defaultCouplerNodeData,
            selected: true,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "output1" ? "output1" : "output2",
            target: newNodeId,
            targetHandle: "input",
            type: "feeder",
          });
          deselectNode(id);
        }}
        className="rounded-xl bg-neutral-100 text-xs hover:bg-neutral-200"
      >
        Coupler
      </button>
      <button
        onClick={() => {
          const newNodeId = uuidv4();
          const newEdgeId = uuidv4();
          addNode({
            id: newNodeId,
            type: "omni",
            position:
              portType === "output1"
                ? {
                    x: xPos + 250,
                    y: yPos - 150,
                  }
                : {
                    x: xPos + 450,
                    y: yPos - 150,
                  },
            data: {
              omniId: "0",
            },
            selected: false,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "output1" ? "output1" : "output2",
            target: newNodeId,
            // targetHandle: "input",
            type: "feeder",
          });
        }}
        className="rounded-xl bg-neutral-100 text-xs hover:bg-neutral-200"
      >
        Omni
      </button>
      <button
        onClick={() => {
          const newNodeId = uuidv4();
          const newEdgeId = uuidv4();
          addNode({
            id: newNodeId,
            type: "hybrid",
            position:
              portType === "output1"
                ? {
                    x: xPos + 250,
                    y: yPos - 150,
                  }
                : {
                    x: xPos + 250,
                    y: yPos + 150,
                  },
            data: {
              hybridId: "C0",
            },
            selected: true,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "output1" ? "output1" : "output2",
            target: newNodeId,
            targetHandle: "input",
            type: "feeder",
          });
          deselectNode(id);
        }}
        className="rounded-xl bg-neutral-100 text-xs hover:bg-neutral-200"
      >
        Hybrid
      </button>
      <button className="rounded-xl bg-neutral-100 text-xs hover:bg-neutral-200">
        4
      </button>
    </div>
  );
}

export default memo(HybridNode);
