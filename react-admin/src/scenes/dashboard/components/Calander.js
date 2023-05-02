import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './statusStyle.css';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import useFetch from '../../organogram/useFetch';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
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
import CircleIcon from '@mui/icons-material/Circle';
import {Box} from '@mui/material';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
        width: "700px"
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

const appBtn =
{
    background: "#99C4C8",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
    mr: "15px"
}
const rejBtn =
{
    background: "#FFC18E",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
    borderRadius: "23.84px",
    color: "black",
}
function getDatesInRange(startDate, endDate) {

    const dates = []
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
    // console.log(currentDate, endDate);
  }
  return dates
  }

// const usr_id = sessionStorage.getItem('act_usr_id');


// console.log(usr_id);
export default function MyCalendar(props) {
    const usr_id = props?.id;
    const dayjs = require('dayjs');
    const toBn = n => n?.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    const [value, onChange] = useState(new Date());
    const chunks = useFetch("http://localhost:5000/daily_attendance");
    const emp_leave_history = useFetch('http://localhost:5000/employee/'+usr_id);
    // console.log(usr_id);
    const approvedLeaves = emp_leave_history.leaves?.filter((item) => item.leave_approval_status == 1);

    const dates = approvedLeaves?.map((item)=> getDatesInRange(new Date(item.leave_start_date), new Date(item.leave_end_date)));

    const leaveDates = dates?.map((item)=> item?.map(it=> dayjs(it).format('MM/DD/YYYY'))); //employee leave dates
    // console.log(approvedLeaves);

    const filtered = chunks?.filter((item) => (item.employee.id == usr_id));

    return (
        <div>
            <Box mb={2} mx={18}>
                    <div>
                    <span><CircleIcon sx={{color:"#34A853", ml:3}}/>সঠিক সময়ব্যাপী উপস্থিত</span>
                    <span><CircleIcon sx={{color:"#FBBC04", ml:3}}/>দেরিতে উপস্থিত/দ্রুত অফিস ত্যাগ</span>
                    <span><CircleIcon sx={{color:"#e98847", ml:3}}/>ছুটি</span>
                    <span><CircleIcon sx={{color:"#d82a2a", ml:3}}/>অনুপস্থিত</span>
                    </div>
                </Box>
            <Calendar
                onChange={onChange}
                value={value}
                tileClassName={({ date, view }) => {
                    if (filtered?.find(x => x.date === moment(date).format("MM/DD/YYYY") && x?.late_status == 0)) {
                        return 'present';
                    }
                    else if (filtered?.find(x => x.date === moment(date).format("MM/DD/YYYY") && x?.late_status == 1)) {
                        return 'late';
                    }
                    else if (filtered?.find(x => x.date === moment(date).format("MM/DD/YYYY") && x?.late_status == 2)) {
                        return 'absent';
                    }
                    if(leaveDates?.find(x=> x.find(y => y === moment(date).format("MM/DD/YYYY")))){
                        return 'leave';
                    }
                    
                }
                }
                calendarType='Arabic'
                showNeighboringMonth={false}
            />
            <ToastContainer/>
        </div>
    );
}

// if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
//     return  'highlight'
//    }
