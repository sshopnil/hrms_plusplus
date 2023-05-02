import React, {useEffect} from 'react';
import Sidebar from './scenes/global/Sidebar';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import LeaveApply from './scenes/LeaveApply';
import LeaveStatus from './scenes/LeaveStatus';
import LeaveApproval from './scenes/LeaveApproval';
import LeaveRecord from './scenes/LeaveRecord';
import Topbar from "./scenes/global/Topbar";
import { Routes } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useFetch from './scenes/organogram/useFetch';
import axios from 'axios';
import AttendanceStatus from './scenes/AttendanceStatus';
import AttendanceLateApproval from './scenes/AttendanceLateApproval';
import EmployeeOrganogram from './scenes/EmployeeOrganogram';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import LoginPage from './LoginPage';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


// window.localStorage.clear();
export default function EmployeeSystem() {

  const chunks = useFetch("http://localhost:5000/office_post");
  

  const pass_stat = sessionStorage.getItem('user_pass_stat');
  // console.log(parseInt(pass_stat));


  const [open, setOpen] = React.useState(true);
  // if(parseInt(pass_stat) == 0)
  // {
  //   setOpen(true);
  // }
  const handleClose = () => setOpen(false);

  return (
    <div className="app">
        <Sidebar />
        <main className="content">
        <Topbar />
          {
            (parseInt(pass_stat) == 0) &&
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              ডিফল্ট পাসওয়ার্ড সনাক্ত করা হয়েছে
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
                দয়া করে, পাসওয়ার্ড পরিবর্তন করুন
              </Typography>
            </Box>
          </Modal>
          }
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/LeaveApply" element={<LeaveApply />} />
            <Route path="/LeaveRecord" element={<LeaveRecord />} />
            <Route path="/LeaveStatus" element={<LeaveStatus />} />
            <Route path="/LeaveApproval" element={<LeaveApproval postData = {chunks}/>} />
            <Route path="/AttendanceStatus" element={<AttendanceStatus />} />
            <Route path="/AttendanceLateApproval" element={<AttendanceLateApproval postData = {chunks}/>} />
            <Route path="/EmployeeOrganogram" element={<EmployeeOrganogram/>} />
          </Routes>
        </main>
      </div>
  )
}
