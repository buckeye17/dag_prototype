import React from 'react';
import { EdgeText, getBezierPath } from 'reactflow';

function EdgeLabel({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
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
      <EdgeText
        x={labelX}
        y={labelY}
        label={data?.label || ''}
        labelStyle={{ fill: '#555', fontWeight: 500 }}
        labelShowBg
        labelBgStyle={{ fill: 'white', fillOpacity: 0.8 }}
        labelBgPadding={[2, 4]}
        labelBgBorderRadius={2}
      />
    </>
  );
}

export default EdgeLabel;
