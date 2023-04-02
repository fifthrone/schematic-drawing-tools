import { getSmoothStepPath } from "reactflow";
import useStore from "../../store";
import { shallow } from "zustand/shallow";

const foreignObjectSize = 40;

const defaultFeederEdgeData = {
  feederId: "S0",
  feederLength: 1,
  feederType: "LDF4",
};

const selector = (state) => ({
  updateEdgeFeederId: state.updateEdgeFeederId,
  updateEdgeFeederLength: state.updateEdgeFeederLength,
});

export default function FeederEdge(props) {
  const {
    id,
    data,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  } = props;

  const { updateEdgeFeederId, updateEdgeFeederLength } = useStore(
    selector,
    shallow
  );

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
            value={data.feederId}
            onChange={(e) => updateEdgeFeederId(id, e.target.value)}
          />
          <div className="flex flex-row">
            <p>{data.feederType}</p>
            <input
              className="nodrag w-6 bg-transparent text-center"
              type="number"
              value={data.feederLength}
              onChange={(e) => updateEdgeFeederLength(id, e.target.value)}
            />
            <p>m</p>
          </div>
        </div>
      </foreignObject>
    </>
  );
}

export { defaultFeederEdgeData };
