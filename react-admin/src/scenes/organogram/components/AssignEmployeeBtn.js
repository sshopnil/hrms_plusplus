import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DataPost from '../all_data/Data_positions.json';
import TextField from '@mui/material/TextField';
import useFetch from '../useFetch';
import axios from 'axios';
import AddEmpForm from './AddEmpForm';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';



const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {field: "user_image", headerName:"",
    renderCell: (params) => <Avatar src={process.env.PUBLIC_URL+"/user_images/"+params.value}/>
  },
  { field: 'name', headerName: 'নাম', width: 260 },
  {
    field: 'phone_no',
    headerName: 'ফোন নং',
    width: 200,
  },
];

const rows = [
  { id: 1, name: 'Jon', pos: "none"},
];


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
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



export default function AssignEmployeeBtn(props) {
  const unPosEmployees = useFetch("http://localhost:5000/employee");

  const nRow = unPosEmployees.map((item)=> Object.keys(item._office_post).length == 0? { id: item.id, name: item.name, phone_no:item.phone, user_image: item.user_image} : {});
  // console.log(nRow);



  let departments = useFetch("http://localhost:5000/department");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  let parentId = JSON.parse(window.localStorage.getItem('parent'));
  let parentPos = JSON.parse(window.localStorage.getItem('parent_pos'));
  let parentDep = JSON.parse(window.localStorage.getItem('parent_dept'));
  let parent_id = JSON.parse(window.localStorage.getItem('parent_id'));

  const parentDepName = departments.find((item)=> item.id == parentDep);
  // console.log(parentDepName);
  const [openAddEmp, setOpenAddEmp] = React.useState(false);
  const handleAddEmpOpen = () => {

    setOpenAddEmp(true);
  };

  const handleAddEmpClose = () => {
    setOpenAddEmp(false);
  };

  ///=========================adding employee=============================================
  const handleAddEmpAdd = () =>
  {
    const empl_id = sessionStorage.getItem('sel_empl');
    sessionStorage.removeItem('sel_empl');
    const name = nRow.find((item)=>item.id == empl_id);
    // console.log(name[empl_id-1]);
    // console.log(name[empl_id-1], empl_id, parentDep, parentId);

    const obj = {
      "name": name.name,
      "employee_id": parseInt(empl_id),
      "parent_id": parseInt(parent_id),
      "department_id": parseInt(parentDep)
    }
    axios.put('http://localhost:5000/office_post/'+parentId, obj)
      .then(function (response) {
        console.log(response);
        props.handleAddEmployee(name);
        props.handleDialog();
      })
      .catch(function (error) {
        console.log(error);
      }); 
    // window.location.reload();
  }
  ///=========================adding employee=============================================


  ///=========================adding post=============================================


  const formik = useFormik(
    {
      initialValues: {
        পদের_নাম: "",
        বিভাগ: "",
      },
      onSubmit: (values) => {
        const obj = {
          "department_id": values.বিভাগ,
          "parent_id": parseInt(parentId),
          "name": values.পদের_নাম,
        };

        axios.post('http://localhost:5000/office_post', obj)
          .then(function (response) {
            console.log(response);
            props.handleAddPosition();
            props.handleDialog();     
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(window.localStorage.getItem('user'));
        
        // window.alert("Added successfully!");
        // window.localStorage.clear();
        // window.location.reload();
      }
    }
  );
  ///=========================adding post=============================================

  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
        color:"white",
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        sx={{minWidth:"550px", background:"transparent !important"}}
      >
        <Button key="one"
          sx={
            {
              background: "#f5f5fa",
          boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          borderRadius: "30px",
          border:"0",
          boxSizing:"border-box",
          color: "#2a1f62",
          transition: ".2s",
          whiteSpace: "pre",
          wordBreak: "normal",
          wordSpacing: "normal",
          padding:"20px",
          fontSize:"20px",
            }
          }
          onClick={handleClickOpen}
        >পদ তৈরি</Button>
        <Button key="three"
          sx={
            {
              background: "#f5f5fa",
          boxShadow: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
          borderRadius: "30px",
          border:"0",
          boxSizing:"border-box",
          color: "#2a1f62",
          transition: ".2s",
          whiteSpace: "pre",
          wordBreak: "normal",
          wordSpacing: "normal",
          padding:"20px",
          fontSize:"20px",

            }
          }
          onClick={handleAddEmpOpen}
        >কর্মকর্তা/কর্মচারি নিয়োগ</Button>
        {/* <Button key="two"
          sx={
            {
              padding: "5px",
              fontSize: "18px",
              borderRadius: "20px",
              background: "#25316D",
              color:"white",
            }
          }
          onClick={handleRemovePost}
          >পদ অপসরণ</Button> */}
      </ButtonGroup>



      {/* ================================================create post dialog===================================================*/}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          "& .MuiPaper-root":{
            minWidth:"700px"
          }
        }}
      >
        <DialogTitle>
          "{parentDepName?.name}"-পদের অধীনে পদ তৈরি
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 120,py:2 }}>
            <form onSubmit={formik.handleSubmit}>

              <FormControl fullWidth sx={{mb:2}}>

                <TextField id="outlined-basic" label="পদের নাম" variant="outlined" value={formik.values.পদের_নাম} onChange={formik.handleChange} name="পদের_নাম" />

              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="dept">বিভাগ</InputLabel>
                <Select
                  labelId="dept"
                  id="dept"
                  value={formik.values.বিভাগ}
                  label="বিভাগ"
                  name="বিভাগ"
                  onChange={formik.handleChange}
                >
                  {departments.map((info) => <MenuItem value={info.id}>{info.name}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl>
                <ButtonGroup variant="contained" aria-label="button group" sx={{ m: "10px" }}>
                  <Button variant="contained" color='success' type='submit'>প্রয়োগ</Button>
                  <Button variant="contained" color='error' onClick={handleClose} sx={{ ml: "auto" }}>বাতিল</Button>
                </ButtonGroup>
              </FormControl>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ===================================================add employee btn =========================================================== */}


      <BootstrapDialog
        onClose={handleAddEmpClose}
        aria-labelledby="customized-dialog-title"
        open={openAddEmp}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleAddEmpClose}>
          "{parentPos}" -পদে কর্মকর্তা/কর্মচারি সংযুক্ত করুন
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={nRow}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                slots={{ toolbar: GridToolbar }}
                onRowSelectionModelChange={(itm) => sessionStorage.setItem('sel_empl', itm.at(0))}
                // onRowClick={handleRowCLick}
                sx={{
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
              />
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddEmpAdd}>
            যুক্ত করুন
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}