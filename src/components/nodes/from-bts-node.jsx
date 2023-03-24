import React, { memo } from "react";
import { Handle, Position } from "reactflow";

import useStore from "../../store";

function FromBTSNode({ id, data }) {
  return (
    <div className="relative flex h-20 w-20 flex-col items-center justify-center border border-black p-4 text-black">
      <p>From</p>
      <p>BTS</p>
      <p>side</p>

      <Handle type="source" id="1" position={Position.Right} className="top-0" />
      <Handle type="source" id="2" position={Position.Right} className="" />
      <Handle type="source" id="3" position={Position.Right} className="top-20" />
      <Handle type="source" id="4" position={Position.Left} className="top-0" />
      <Handle type="source" id="5" position={Position.Left} className="" />
      <Handle type="source" id="6" position={Position.Left} className="top-20" />
    </div>
  );
}

export default memo(FromBTSNode);
