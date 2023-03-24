import { getSmoothStepPath } from "reactflow";

const foreignObjectSize = 40;

export default function FeederEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="overflow-visible"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="absolute top-0 right-1/2 flex translate-x-1/2 flex-col items-center border text-sm text-black ">
          <input
            className="nodrag w-14 bg-transparent text-center"
            type="text"
            value="S1.1"
            onChange={(e) => updateNodeCouplerId(id, e.target.value)}
          />
          <div className="flex flex-row">
            <p>LDF4</p>
            <input
              className="nodrag w-6 bg-transparent text-center"
              type="text"
              value="20"
              onChange={(e) => updateNodeCouplerLoss(id, e.target.value)}
            />
            <p>m</p>
          </div>
        </div>
      </foreignObject>
    </>
  );
}
