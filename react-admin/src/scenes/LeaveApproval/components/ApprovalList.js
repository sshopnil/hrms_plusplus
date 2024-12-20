import React, {useState} from 'react'
import { Box, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileSharpIcon from '@mui/icons-material/InsertDriveFileSharp';
import Button from '@mui/material/Button';
import useFetch from '../../organogram/useFetch';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { CoPresentSharp } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function createData(leave_id, leave_applicant, leave_type, leave_start, leave_end) {
    return { leave_id, leave_applicant, leave_type, leave_start, leave_end };
}


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

export default function ApprovalList(props) {

    
    const dayjs = require('dayjs');
    const toBn = n => n?.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    const nRow = props.leave_history?.map((item) => createData(item.leave_id, item.employee_name, item.leave_type_name, item.leave_start_date, item.leave_end_date));
    // console.log(nRow);
    // console.log(props.leave_history);

    const notifyApproved = () => {toast.success("আবেদনটি অনুমোদিত হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};
    const notifyRejected = () => {toast.error("আবেদনটি প্রত্যাখ্যাত হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};

    // console.log(nRow);
    function handleClickReject(event, id) {
        const emp_info = props.leave_history?.filter((item)=> item.leave_id == id);
        // console.log(emp_info);

        const obj = {
            "leave_approval_status": 2,
            "leave_end_date": emp_info[0]?.leave_end_date,
            "employee_id": emp_info[0]?.employee_id,
            "leave_start_date": emp_info[0]?.leave_start_date,
            "leave_type_id": id
        }

        axios.put('http://localhost:5000/leave/' + id, obj)
            .then(function (response) {
                console.log(response);
                notifyRejected();
            })
            .catch(function (error) {
                console.log(error);
                // window.alert("Action failed!");
            });
                // window.alert("Action performed successfully!");
            props.updateHistory(id);

        // window.location.reload();
    }
    function handleClick(event, id) {
        event.preventDefault();
        const emp_info = props.leave_history?.filter((item)=> item.leave_id == id);
        // console.log(emp_info);

        const obj = {
            "leave_approval_status": 1,
            "leave_end_date": emp_info[0]?.leave_end_date,
            "employee_id": emp_info[0]?.employee_id,
            "leave_start_date": emp_info[0]?.leave_start_date,
            "leave_type_id": id
        }

        axios.put('http://localhost:5000/leave/' + id, obj)
            .then(function (response) {
                console.log(response);
                // window.alert("Action performed successfully!");
                notifyApproved();
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Action failed!");
            });
            // window.alert("Action performed successfully!");
            props.updateHistory(id);
        // window.location.reload();
    }

    return (
        <Box mx="60px">
            <TableContainer component={Paper} sx={{ minWidth: 650, background: "#f5f5fa",
          boxShadow: "-10px -10px 30px 0 #fff,10px 10px 30px 0 #1d0dca17",
          borderRadius: "30px",
          border:"0",
          boxSizing:"border-box",
          color: "#2a1f62",
          transition: ".2s",
          whiteSpace: "pre",
          wordBreak: "normal",
          wordSpacing: "normal",}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{display:"none"}}>ID</TableCell>
                            <TableCell sx={{fontWeight:"bold !important"}}>আবেদনকারী</TableCell>
                            <TableCell align="left" sx={{fontWeight:"bold !important"}}>ছুটির ধরন</TableCell>
                            <TableCell align="left" sx={{fontWeight:"bold !important"}}>ছুটির শুরু</TableCell>
                            <TableCell align="left" sx={{fontWeight:"bold !important"}}>ছুটির শেষ</TableCell>
                            <TableCell align="center" sx={{fontWeight:"bold !important"}}>সিদ্ধান্ত</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nRow?.map((row) => (
                            <TableRow
                                key={row.leave_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{display:"none"}}>
                                    {row.leave_id}
                                </TableCell>
                                <TableCell align="left">{row.leave_applicant}</TableCell>
                                <TableCell align="left">{row.leave_type}</TableCell>
                                <TableCell align="left">{toBn(dayjs(row.leave_start).format("DD-MM-YYYY"))}</TableCell>
                                <TableCell align="left">{toBn(dayjs(row.leave_end).format("DD-MM-YYYY"))}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" sx={appBtn} onClick={(event) => handleClick(event, row.leave_id)}>অনুমোদন</Button>
                                    <Button size="small" sx={rejBtn} onClick={(event) => handleClickReject(event, row.leave_id)}>প্রত্যাখ্যান</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer autoClose={2000}/>
        </Box>
    )
}


// const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('https://example.com/api/data')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

