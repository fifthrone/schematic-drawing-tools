import { Position } from "reactflow";

function getAdjustedPosition(
  position: "top" | "right" | "bottom" | "left",
  rotation: 0 | 90 | 180 | 270,
  flipX: boolean,
  flipY: boolean
) {
  const positions = [
    Position.Top,
    Position.Right,
    Position.Bottom,
    Position.Left,
  ];

  const adjustedPositions = {
    top: !flipY
      ? positions[(rotation / 90) % 4]
      : positions[(rotation / 90 + 2) % 4],
    right: !flipX
      ? positions[(rotation / 90 + 1) % 4]
      : positions[(rotation / 90 + 3) % 4],
    bottom: !flipY
      ? positions[(rotation / 90 + 2) % 4]
      : positions[(rotation / 90) % 4],
    left: !flipX
      ? positions[(rotation / 90 + 3) % 4]
      : positions[(rotation / 90 + 1) % 4],
  };

  return adjustedPositions[position];
}

export { getAdjustedPosition };
