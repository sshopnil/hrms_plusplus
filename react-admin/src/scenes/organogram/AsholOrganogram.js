import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, ConnectionLineType, useNodesState, useEdgesState, Background, MiniMap } from 'reactflow';
import styled, { ThemeProvider } from 'styled-components';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import './index.css';
import CustomNode from './components/CustomNode.js';
import { Box } from '@mui/material';
import Header from '../../components/Header.jsx';
import { Controls } from 'reactflow';
import { darkTheme, lightTheme } from './theme';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import AssignEmployeeBtn from './components/AssignEmployeeBtn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from './useFetch';


function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const nodeTypes = {
  custom: CustomNode,
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const MiniMapStyled = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 105;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  if (nodes === null || edges === null) {
    return null;
  }
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: (nodeWithPosition.x - nodeWidth / 2) * 1.5,
      y: (nodeWithPosition.y - nodeHeight / 2) * 1.5,
    };

    return node;
  });

  return { nodes, edges };
};







const componentNode = { custom: (props) => <CustomNode myProp="myProps" {...props} /> };


const AsholOrganogram = (props) => {

  const notifyAdd = () => { toast.success("কর্মকর্তা/কর্মচারী নিয়োগ সফল হয়েছে!", { position: toast.POSITION.BOTTOM_RIGHT }) };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("opened");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onNodeClick = (event, node) => {
    window.localStorage.setItem('parent', JSON.stringify(node.id));
    window.localStorage.setItem('parent_pos', JSON.stringify(node.data.job));
    window.localStorage.setItem('parent_dept', JSON.stringify(node.data.dep_id));
    handleClickOpen();

  }

  // console.log("hello");
  // window.location.reload();
  const [initNode, setInitNode] = React.useState(props.nodes);
  const [initEdge, setInitEdge] = React.useState(props.edges);
  const department_ = props.departments;
  const office_posts = props.office_posts;

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initNode,
    initEdge
  );


  // console.log("added!");
  

  ///========================================handle add employees========================================
  const handleAddEmployee = (empObj) => {
    let selfId = JSON.parse(window.localStorage.getItem('parent'));
    const temp_node = initNode?.map((item => { if (item.id == selfId) { item.data.name = empObj.name; } return item; }));

    setInitNode(temp_node);
    notifyAdd();
  }
  ///========================================handle add employees========================================



  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);


  // const customMsg = useCallback(msg, []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const [captureElementClick, setCaptureElementClick] = React.useState(true);

  const [mode, setMode] = useState('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const toggleMode = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="layoutflow">
      <Box mx="60px">
        <Header
          title="অরগানোগ্রাম"
          subtitle="সামগ্রিক অরগানোগ্রাম"
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          backgroundColor: "transparent !important",
            borderRadius:"20px",
        }}

      >
        <DialogContent>
          <AssignEmployeeBtn handleAddPosition={props.handleOffice_posts} handleDialog={handleClose} handleAddEmployee={handleAddEmployee} />
        </DialogContent>
      </Dialog>
      <ThemeProvider theme={theme}>
        <button onClick={toggleMode} style={{ position: 'absolute', zIndex: 100, left: 1000, top: 10 }}>
          switch mode
        </button>
        <ReactFlowStyled
          nodes={nodes}
          edges={edges}
          nodeTypes={componentNode}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          onNodeClick={captureElementClick ? onNodeClick : undefined}
          fitView
          style={{ marginLeft: "50px",
          background: "#f5f5fa",
          boxShadow: "-10px -10px 30px 0 #fff,10px 10px 30px 0 #1d0dca17",
          borderRadius: "30px",
          border:"0",
          boxSizing:"border-box",
          color: "#2a1f62",
          transition: ".2s",
          whiteSpace: "pre",
          wordBreak: "normal",
          wordSpacing: "normal",
        }}
        >
          {/* <Background color='#000'/> */}
          <MiniMapStyled />
          <ControlsStyled />
        </ReactFlowStyled>
      </ThemeProvider>
      <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
      <ToastContainer />
    </div>
  );
};


export default AsholOrganogram;