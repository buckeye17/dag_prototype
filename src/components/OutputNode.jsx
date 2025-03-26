import React from 'react';
import { Handle, Position } from 'reactflow';

function OutputNode({ data }) {
  return (
    <div className={`node output-node ${data.expanded ? 'expanded' : ''}`}>
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
      
      {/* Output nodes only have a target handle on the left */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="handle target-handle"
      />
    </div>
  );
}

export default OutputNode;
