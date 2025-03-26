import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import InputNode from './components/InputNode';
import IntermediateNode from './components/IntermediateNode';
import OutputNode from './components/OutputNode';
import EdgeLabel from './components/EdgeLabel';
import { initNodes, initEdges } from './data/initialData';
import { applyEntitreeFlexLayout } from './utils/layoutAlgorithm';

import './App.css';

// Node types for custom nodes
const nodeTypes = {
  input: InputNode,
  intermediate: IntermediateNode,
  output: OutputNode,
};

// Edge types for custom edges
const edgeTypes = {
  labeled: EdgeLabel,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // Apply layout on initial render and when expanded nodes change
  useEffect(() => {
    const layoutNodes = applyEntitreeFlexLayout(nodes, edges, expandedNodes);
    setNodes([...layoutNodes]);
  }, [expandedNodes, setNodes]); // Removed nodes and edges from dependencies

  // Handle node click to toggle children visibility
  const onNodeClick = useCallback((_, node) => {
    // Check if the node has children
    const hasChildren = edges.some(edge => edge.source === node.id);
    
    if (hasChildren) {
      // Store current expansion state before updating
      const isCurrentlyExpanded = expandedNodes.has(node.id);
      
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(node.id)) {
          newSet.delete(node.id);
        } else {
          newSet.add(node.id);
        }
        return newSet;
      });

      // Update node data to reflect expansion state
      // Use the inverted current state instead of checking expandedNodes
      setNodes(nds => 
        nds.map(n => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                expanded: !isCurrentlyExpanded
              }
            };
          }
          return n;
        })
      );
    }
  }, [edges, expandedNodes, setNodes]);

  return (
    <div className="app-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-right"
        defaultEdgeOptions={{
          type: 'labeled',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20
          },
          style: { stroke: '#555' }
        }}
      >
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
