import React, { memo } from "react";
import { Handle, Position } from "reactflow";

import useStore from "../../store";

function PanelNode({ id, data }) {
  const updateNodeOmniId = useStore((state) => state.updateNodeOmniId);

  return (
    <div className="relative w-8 h-16">
      <div className="flex flex-row absolute text-black bottom-16 right-0 left-4 items-center justify-center">
        <p>Ant.</p>
        <input
          className="bg-transparent w-8 text-center nodrag"
          type="text"
          value={data.panelId}
          onChange={(e) => updateNodeOmniId(id, e.target.value)}
        />
      </div>

      <svg viewBox="0 0 82 160" className="w-full h-full">
        <polygon
          points="40,0 80,40 80,120, 40,160"
          className="fill-current text-white stroke-[3px] stroke-black"
        />
      </svg>

      <Handle type="target" position={Position.Bottom} className="" />
    </div>
  );
}

export default memo(PanelNode);
