/**
 * Implementation of the Entitree Flex Tree horizontal layout algorithm
 * This is a simplified version focusing on horizontal tree layout with proper parent-child relationships
 */

// Helper function to find all child nodes of a node
const getChildNodes = (nodeId, edges, nodes) => {
  const childEdges = edges.filter(edge => edge.source === nodeId);
  return childEdges.map(edge => {
    const target = nodes.find(node => node.id === edge.target);
    return target ? target.id : null;
  }).filter(id => id !== null);
};

// Helper to check if a node should be visible based on parent expansion state
const isNodeVisible = (nodeId, nodes, expandedNodes) => {
  const node = nodes.find(n => n.id === nodeId);
  
  // If no parent, it's a root node and always visible
  if (!node.parentNode) return true;
  
  // If parent is expanded, check its visibility recursively
  const parentNode = nodes.find(n => n.id === node.parentNode);
  if (!parentNode) return false;
  
  return expandedNodes.has(node.parentNode) && isNodeVisible(node.parentNode, nodes, expandedNodes);
};

// Calculate the node hierarchy and set hidden property
const updateNodeVisibility = (nodes, edges, expandedNodes) => {
  return nodes.map(node => {
    // Check if this node has a parent and if the parent is expanded
    if (node.parentNode) {
      const visible = isNodeVisible(node.id, nodes, expandedNodes);
      return { ...node, hidden: !visible };
    }
    
    // Root nodes are always visible
    return { ...node, hidden: false };
  });
};

// Get the depth of a node in the tree (horizontal levels)
const getNodeDepth = (nodeId, edges, visited = new Set()) => {
  if (visited.has(nodeId)) return 0; // Prevent cycles
  visited.add(nodeId);
  
  // Find all edges where this node is the target
  const parentEdges = edges.filter(edge => edge.target === nodeId);
  
  if (parentEdges.length === 0) return 0; // It's a root node
  
  // Get the maximum depth of all parents plus 1
  return Math.max(...parentEdges.map(edge => 
    getNodeDepth(edge.source, edges, new Set(visited)) + 1
  ));
};

// The main layout algorithm
export const applyEntitreeFlexLayout = (inputNodes, edges, expandedNodes) => {
  // First update node visibility based on expanded state
  const nodes = updateNodeVisibility(inputNodes, edges, expandedNodes);
  
  // Filter out hidden nodes for layout calculation
  const visibleNodes = nodes.filter(node => !node.hidden);
  
  // Calculate depths for nodes (horizontal positioning)
  const nodeDepths = {};
  visibleNodes.forEach(node => {
    nodeDepths[node.id] = getNodeDepth(node.id, edges);
  });
  
  // Group nodes by depth for vertical positioning
  const nodesByDepth = {};
  visibleNodes.forEach(node => {
    const depth = nodeDepths[node.id];
    if (!nodesByDepth[depth]) nodesByDepth[depth] = [];
    nodesByDepth[depth].push(node);
  });
  
  // Set horizontal positions based on depth
  const HORIZONTAL_SPACING = 250;
  
  // Set vertical positions within each depth level
  const VERTICAL_SPACING = 120;
  const NODE_HEIGHT = 60;
  
  // Calculate positions
  const positionedNodes = [...nodes];
  
  Object.entries(nodesByDepth).forEach(([depth, depthNodes]) => {
    const totalHeight = depthNodes.length * NODE_HEIGHT + (depthNodes.length - 1) * VERTICAL_SPACING;
    const startY = -totalHeight / 2;
    
    depthNodes.forEach((node, index) => {
      const nodeIndex = positionedNodes.findIndex(n => n.id === node.id);
      if (nodeIndex !== -1) {
        positionedNodes[nodeIndex] = {
          ...positionedNodes[nodeIndex],
          position: {
            x: parseInt(depth) * HORIZONTAL_SPACING,
            y: startY + index * (NODE_HEIGHT + VERTICAL_SPACING)
          }
        };
      }
    });
  });
  
  // Update child nodes to be positioned relative to their parents
  positionedNodes.forEach(node => {
    if (node.parentNode) {
      const parentNode = positionedNodes.find(n => n.id === node.parentNode);
      if (parentNode) {
        const childNodes = getChildNodes(parentNode.id, edges, positionedNodes);
        const childCount = childNodes.length;
        const childIndex = childNodes.indexOf(node.id);
        
        // Position children in a vertical arrangement relative to parent
        const yOffset = (childIndex - (childCount - 1) / 2) * 80;
        
        // Update child position to be relative to parent
        const nodeIndex = positionedNodes.findIndex(n => n.id === node.id);
        if (nodeIndex !== -1) {
          positionedNodes[nodeIndex] = {
            ...positionedNodes[nodeIndex],
            position: {
              x: 200, // Fixed distance from parent horizontally
              y: yOffset // Vertical offset based on child index
            }
          };
        }
      }
    }
  });
  
  // Update hasChildren flag for all nodes
  return positionedNodes.map(node => {
    const hasChildren = edges.some(edge => edge.source === node.id);
    return {
      ...node,
      data: {
        ...node.data,
        hasChildren,
        expanded: expandedNodes.has(node.id)
      }
    };
  });
};
