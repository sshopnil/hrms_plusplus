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
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel'
import Textarea from '@mui/joy/Textarea';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tileGroupProps, tileProps } from 'react-calendar/dist/cjs/shared/propTypes';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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




const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: "2px",
  },
  '& .MuiDialogActions-root': {
    padding: "2px",
  },
  '& .MuiPaper-root': {
    minWidth: "1000px"
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};



function createData(id, pos_name, dept_name, name, phone, curr_addr) {
  return { id, pos_name, dept_name, name, phone, curr_addr };
}

const componentNode = { custom: (props) => <CustomNode myProp="myProps" {...props} /> };


const AsholOrganogram = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [rows, setRows] = useState({});
  // console.log(props.office_posts);

  const onNodeClick = (event, node) => {
    // window.localStorage.setItem('parent', JSON.stringify(node.id));
    // window.localStorage.setItem('parent_pos', JSON.stringify(node.data.job));
    // window.localStorage.setItem('parent_dept', JSON.stringify(node.data.dep_id));

    const arr = props.office_posts?.find((item) => item.id == node.id);
    setRows(arr);
    setOpen(true);
    // {if(item.id == node.id){return createData(item.id, item?.name, item.department.name, item?.employee?.name, item?.employee?.phone, item?.employee?.address_curr)}}
  }
  console.log(rows);

  // console.log("hello");
  // window.location.reload();
  const initNode = props.nodes;
  const initEdge = props.edges;

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initNode,
    initEdge
  );

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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          কর্মকর্তা/কর্মচারীর তথ্য
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper} sx={{ m: 5 }}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">পদ</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.name}</TableRow>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">বিভাগ</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.department?.name}</TableRow>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">কর্মকর্তা/কর্মচারীর নাম</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.employee?.name}</TableRow>
                  </TableCell>

                </TableRow>

                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">মোবাইল নং</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.employee?.phone}</TableRow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">বর্তমান ঠিকানা</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.employee?.address_curr}</TableRow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TableRow align="left" sx={{ fontWeight: "bold !important" }} component="th">স্থায়ী ঠিকানা</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="left">{rows?.employee?.address_perm}</TableRow>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>

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
          style={{ marginLeft: "50px" }}
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
    </div>
  );
};


export default React.memo(AsholOrganogram);

