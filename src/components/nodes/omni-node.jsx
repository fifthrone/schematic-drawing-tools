import React, { memo } from "react";
import { Handle, Position } from "reactflow";

import useStore from "../../store";

function OmniNode({ id, data }) {
  const updateNodeOmniId = useStore((state) => state.updateNodeOmniId);

  return (
    <div className="relative h-10 w-10">
      <div className="absolute bottom-9 right-0 left-0 flex flex-row items-center justify-center text-black">
        <p>Ant.</p>
        <input
          className="nodrag w-8 bg-transparent text-center"
          type="text"
          value={data.omniId}
          onChange={(e) => updateNodeOmniId(id, e.target.value)}
        />
      </div>

      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polygon
          points="0,14 100,14 50,100"
          className="fill-current stroke-black stroke-[3px] text-white"
        />
      </svg>

      <Handle type="target" position={Position.Bottom} className="" />
    </div>
  );
}

export default memo(OmniNode);
