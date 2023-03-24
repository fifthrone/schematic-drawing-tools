import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  Position,
  NodeToolbar,
  useUpdateNodeInternals,
  getConnectedEdges,
} from "reactflow";

import { v4 as uuidv4 } from "uuid";

import useStore from "../../store";
import { shallow } from "zustand/shallow";
import Image from "next/image";
import flipXIcon from "../../../public/flipX.png";
import flipYIcon from "../../../public/flipY.png";
import rotateIcon from "../../../public/rotate.png";
import { getAdjustedPosition } from "../../utils/utils";

const defaultCouplerNodeData = {
  couplerId: "C0",
  couplerLoss: 6,
  rotation: 0,
  flipX: false,
  flipY: false,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  addEdge: state.addEdge,
  updateNodeCouplerId: state.updateNodeCouplerId,
  updateNodeCouplerLoss: state.updateNodeCouplerLoss,
  updateNodeCouplerRotation: state.updateNodeCouplerRotation,
  updateNodeCouplerFlipX: state.updateNodeCouplerFlipX,
  updateNodeCouplerFlipY: state.updateNodeCouplerFlipY,
  deselectNode: state.deselectNode,
});

function CouplerNode(props) {
  const { id, data, xPos, yPos, ...rest } = props;
  const {
    edges,
    updateNodeCouplerId,
    updateNodeCouplerLoss,
    updateNodeCouplerRotation,
    updateNodeCouplerFlipX,
    updateNodeCouplerFlipY,
  } = useStore(selector, shallow);
  const updateNodeInternals = useUpdateNodeInternals();

  const connectedEdges = getConnectedEdges([props], edges);

  const isDirectPortConnected =
    connectedEdges.filter(
      (edge) => edge.source === id && edge.sourceHandle === "direct"
    ).length > 0;
  const isCouplingPortConnected =
    connectedEdges.filter(
      (edge) => edge.source === id && edge.sourceHandle === "coupling"
    ).length > 0;

  return (
    <div
      className="relative h-9 w-14 border border-black"
      style={{
        transform: `rotate(${data.rotation}deg) scaleX(${
          data.flipX ? "-1" : "1"
        })  scaleY(${data.flipY ? "-1" : "1"})`,
      }}
    >
      <div
        className="absolute top-10 right-0 left-0 flex flex-col items-center border text-black"
        style={{
          transform: `rotate(-${data.rotation}deg) scaleX(${
            (data.rotation / 90) % 2 === 0
              ? data.flipX
                ? "-1"
                : "1"
              : data.flipY
              ? "-1"
              : "1"
          })  scaleY(${
            (data.rotation / 90) % 2 === 0
              ? data.flipY
                ? "-1"
                : "1"
              : data.flipX
              ? "-1"
              : "1"
          })`,
        }}
      >
        <input
          className="nodrag w-14 bg-transparent text-center"
          type="text"
          value={data.couplerId}
          onChange={(e) => updateNodeCouplerId(id, e.target.value)}
        />
        <div className="flex flex-row">
          <input
            className="nodrag w-6 bg-transparent text-center"
            type="text"
            value={data.couplerLoss}
            onChange={(e) => updateNodeCouplerLoss(id, e.target.value)}
          />
          <p>dB</p>
        </div>
      </div>
      <div className="absolute top-0 left-8 h-2 w-4 bg-black"></div>
      <div className="absolute left-3 top-0 h-4 w-[1px] -translate-x-1/2 bg-black"></div>
      <div className="absolute left-3 right-3 top-0 h-4 border-r border-b border-black"></div>
      <hr className="absolute top-6 right-0 left-0 -translate-y-1/2 border-black"></hr>
      <div className="absolute top-6 left-1 h-[6px] w-[6px] -translate-y-1/2 rotate-45 border-t border-r border-black"></div>
      <div className="absolute top-6 left-10 h-[6px] w-[6px] -translate-y-1/2 rotate-45 border-t border-r border-black"></div>
      <div className="absolute top-[6px] left-3 h-[6px] w-[6px] -translate-x-1/2 -rotate-45 border-t border-r border-black"></div>

      <NodeToolbar
        offset={40}
        position={Position.Bottom}
        className="top-0 flex flex-row space-x-1"
      >
        <button
          onClick={() => {
            updateNodeCouplerRotation(id, (data.rotation + 90) % 360);
            updateNodeInternals(id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 bg-white p-[5px] text-xl text-black"
        >
          <Image src={rotateIcon} alt="rotate" className="scale-90" />
        </button>
        <button
          onClick={() => {
            if ((data.rotation / 90) % 2 === 0) {
              updateNodeCouplerFlipX(id, !data.flipX);
            } else {
              updateNodeCouplerFlipY(id, !data.flipY);
            }
            updateNodeInternals(id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 bg-white p-[5px] text-xl text-black"
        >
          <Image src={flipXIcon} alt="flip X" className="-translate-y-[1px]" />
        </button>
        <button
          onClick={() => {
            if ((data.rotation / 90) % 2 === 0) {
              updateNodeCouplerFlipY(id, !data.flipY);
            } else {
              updateNodeCouplerFlipX(id, !data.flipX);
            }
            updateNodeInternals(id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 bg-white p-[5px] text-xl text-black"
        >
          <Image src={flipYIcon} alt="flip Y" className="translate-x-[1px]" />
        </button>
      </NodeToolbar>
      {!isCouplingPortConnected ? (
        <NodeToolbar
          position={getAdjustedPosition(
            "top",
            data.rotation,
            data.flipX,
            data.flipY
          )}
          offset={(data.rotation/90) % 2 === 0 ? 10 : -5}
          // className="-left-4"
        >
          <button className="group flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-white text-xl text-black">
            +
            <div className="hidden group-hover:block">
              <AddMenu
                portType="coupling"
                id={id}
                xPos={xPos}
                yPos={yPos}
                className="absolute bottom-0 right-1/2 translate-x-1/2"
              />
            </div>
          </button>
        </NodeToolbar>
      ) : null}
      {!isDirectPortConnected ? (
        <NodeToolbar
          position={getAdjustedPosition(
            "right",
            data.rotation,
            data.flipX,
            data.flipY
          )}
          offset={(data.rotation/90) % 2 === 0 ? 10 : 12}
        >
          <button className="group flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-white text-xl text-black">
            +
            <div className="hidden group-hover:block">
              <AddMenu
                portType="direct"
                id={id}
                xPos={xPos}
                yPos={yPos}
                className="absolute top-1/2 left-0 -translate-y-1/2"
              />
            </div>
          </button>
        </NodeToolbar>
      ) : null}

      <Handle
        type="source"
        id="coupling"
        position={getAdjustedPosition(
          "top",
          data.rotation,
          data.flipX,
          data.flipY
        )}
        className={"left-[12px] -top-[0px] -translate-x-1/2 -translate-y-1/2"}
      />
      <Handle
        type="target"
        id="input"
        position={getAdjustedPosition(
          "left",
          data.rotation,
          data.flipX,
          data.flipY
        )}
        className={"left-[0px] top-[24px] -translate-x-1/2 -translate-y-1/2"}
      />
      <Handle
        type="source"
        id="direct"
        position={getAdjustedPosition(
          "right",
          data.rotation,
          data.flipX,
          data.flipY
        )}
        className={"left-[48px] top-[24px] translate-x-1/2 -translate-y-1/2"}
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
              portType === "direct"
                ? {
                    x: xPos + 250,
                    y: yPos,
                  }
                : {
                    x: xPos + 150,
                    y: yPos - 150,
                  },
            data: defaultCouplerNodeData,
            selected: true,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "direct" ? "direct" : "coupling",
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
              portType === "direct"
                ? {
                    x: xPos + 250,
                    y: yPos - 150,
                  }
                : {
                    x: xPos,
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
            sourceHandle: portType === "direct" ? "direct" : "coupling",
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
            type: "panel",
            position:
              portType === "direct"
                ? {
                    x: xPos + 250,
                    y: yPos - 150,
                  }
                : {
                    x: xPos,
                    y: yPos - 150,
                  },
            data: {
              panelId: "0",
            },
            selected: false,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "direct" ? "direct" : "coupling",
            target: newNodeId,
            // targetHandle: "input",
            type: "feeder",
          });
        }}
        className="rounded-xl bg-neutral-100 text-xs hover:bg-neutral-200"
      >
        Panel
      </button>
      <button
        onClick={() => {
          const newNodeId = uuidv4();
          const newEdgeId = uuidv4();
          addNode({
            id: newNodeId,
            type: "hybrid",
            position:
              portType === "direct"
                ? {
                    x: xPos + 250,
                    y: yPos,
                  }
                : {
                    x: xPos + 150,
                    y: yPos - 250,
                  },
            data: {
              hybridId: "C0",
            },
            selected: true,
          });
          addEdge({
            id: newEdgeId,
            source: id,
            sourceHandle: portType === "direct" ? "direct" : "coupling",
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

export { defaultCouplerNodeData };
export default memo(CouplerNode);
