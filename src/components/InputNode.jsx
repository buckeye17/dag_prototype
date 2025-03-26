import React from 'react';
import { Handle, Position } from 'reactflow';

function InputNode({ data }) {
  return (
    <div className={`node input-node ${data.expanded ? 'expanded' : ''}`}>
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
      
      {/* Input nodes only have a source handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="handle source-handle"
      />
    </div>
  );
}

export default InputNode;
