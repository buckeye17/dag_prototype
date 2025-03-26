import React from 'react';
import { Handle, Position } from 'reactflow';

function IntermediateNode({ data }) {
  return (
    <div className={`node intermediate-node ${data.expanded ? 'expanded' : ''}`}>
      <div className="node-content">
        <div className="node-header">
          {data.label}
          {data.hasChildren && (
            <span className="expand-icon">
              {data.expanded ? '−' : '+'}
            </span>
          )}
        </div>
        {data.description && (
          <div className="node-description">{data.description}</div>
        )}
      </div>
      
      {/* Intermediate nodes have both target and source handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="handle target-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle source-handle"
      />
    </div>
  );
}

export default IntermediateNode;
