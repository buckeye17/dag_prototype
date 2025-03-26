// Sample initial nodes
export const initNodes = [
  {
    id: 'input1',
    type: 'input',
    data: { 
      label: 'Input A',
      description: 'Starting point of the process',
      hasChildren: true,
      expanded: false
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'input2',
    type: 'input',
    data: { 
      label: 'Input B',
      description: 'Alternative starting point',
      hasChildren: true,
      expanded: false
    },
    position: { x: 0, y: 100 },
  },
  {
    id: 'intermediate1',
    type: 'intermediate',
    data: { 
      label: 'Process 1',
      description: 'First transformation step',
      hasChildren: true,
      expanded: false
    },
    position: { x: 250, y: 0 },
  },
  {
    id: 'intermediate2',
    type: 'intermediate',
    data: { 
      label: 'Process 2',
      description: 'Second transformation step',
      hasChildren: false
    },
    position: { x: 250, y: 100 },
  },
  {
    id: 'intermediate3',
    type: 'intermediate',
    data: { 
      label: 'Process 3',
      description: 'Third transformation step',
      hasChildren: false
    },
    position: { x: 500, y: 50 },
  },
  {
    id: 'intermediate1-1',
    type: 'intermediate',
    data: { 
      label: 'Subprocess 1.1',
      description: 'Detail step of Process 1',
      hasChildren: false
    },
    position: { x: 400, y: -50 },
    parentNode: 'intermediate1',
    hidden: true,
  },
  {
    id: 'intermediate1-2',
    type: 'intermediate',
    data: { 
      label: 'Subprocess 1.2',
      description: 'Another detail step',
      hasChildren: false
    },
    position: { x: 400, y: 50 },
    parentNode: 'intermediate1',
    hidden: true,
  },
  {
    id: 'input1-1',
    type: 'input',
    data: { 
      label: 'Input A.1',
      description: 'Subcomponent of Input A',
      hasChildren: false
    },
    position: { x: 150, y: -50 },
    parentNode: 'input1',
    hidden: true,
  },
  {
    id: 'input1-2',
    type: 'input',
    data: { 
      label: 'Input A.2',
      description: 'Another subcomponent',
      hasChildren: false
    },
    position: { x: 150, y: 50 },
    parentNode: 'input1',
    hidden: true,
  },
  {
    id: 'input2-1',
    type: 'intermediate',
    data: { 
      label: 'Input B.1',
      description: 'Subcomponent of Input B',
      hasChildren: false
    },
    position: { x: 150, y: 50 },
    parentNode: 'input2',
    hidden: true,
  },
  {
    id: 'output1',
    type: 'output',
    data: { 
      label: 'Output X',
      description: 'Final result',
      hasChildren: false
    },
    position: { x: 750, y: 50 },
  },
];

// Sample initial edges
export const initEdges = [
  {
    id: 'e-input1-intermediate1',
    source: 'input1',
    target: 'intermediate1',
    data: { label: 'Process' },
    type: 'labeled',
  },
  {
    id: 'e-input2-intermediate2',
    source: 'input2',
    target: 'intermediate2',
    data: { label: 'Transform' },
    type: 'labeled',
  },
  {
    id: 'e-intermediate1-intermediate3',
    source: 'intermediate1',
    target: 'intermediate3',
    data: { label: 'Continue' },
    type: 'labeled',
  },
  {
    id: 'e-intermediate2-intermediate3',
    source: 'intermediate2',
    target: 'intermediate3',
    data: { label: 'Join' },
    type: 'labeled',
  },
  {
    id: 'e-intermediate3-output1',
    source: 'intermediate3',
    target: 'output1',
    data: { label: 'Finish' },
    type: 'labeled',
  },
  {
    id: 'e-intermediate1-intermediate1-1',
    source: 'intermediate1',
    target: 'intermediate1-1',
    data: { label: 'SubA' },
    type: 'labeled',
  },
  {
    id: 'e-intermediate1-intermediate1-2',
    source: 'intermediate1',
    target: 'intermediate1-2',
    data: { label: 'SubB' },
    type: 'labeled',
  },
  {
    id: 'e-input1-input1-1',
    source: 'input1',
    target: 'input1-1',
    data: { label: 'Derives' },
    type: 'labeled',
  },
  {
    id: 'e-input1-input1-2',
    source: 'input1',
    target: 'input1-2',
    data: { label: 'Contains' },
    type: 'labeled',
  },
  {
    id: 'e-input2-input2-1',
    source: 'input2',
    target: 'input2-1',
    data: { label: 'Uses' },
    type: 'labeled',
  },
];
