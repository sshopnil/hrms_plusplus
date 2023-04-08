import React from 'react'
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

export default function ApprovalList() {
    
    // console.log(pos_id);
    const initNode = JSON.parse(window.localStorage.getItem('nodes'));
    const usr_id = sessionStorage.getItem('act_usr_id');

    const isPositioned = initNode?.filter((item) => item.data.emp_id == usr_id);
    const pos_id = isPositioned[0]?.id;

    const emp_leave_history = useFetch('http://localhost:5000/leave/subordinate_leave/'.concat(pos_id));

    const nRow = emp_leave_history?.map((item) => createData(item.leave_id, item.employee_name, item.leave_type_name, item.leave_start_date, item.leave_end_date));
    console.log(nRow);
    function handleClick(event, id) {
        const emp_info = emp_leave_history?.filter((item)=> item.leave_id == id);
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
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    }

    return (
        <Box mx="60px">
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">আবেদনকারী</TableCell>
                            <TableCell align="left">ছুটির ধরন</TableCell>
                            <TableCell align="left">ছুটির শুরু</TableCell>
                            <TableCell align="left">ছুটির শেষ</TableCell>
                            <TableCell align="center">সিদ্ধান্ত</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {nRow?.map((row) => (
                            <TableRow
                                key={row.leave_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.leave_id}
                                </TableCell>
                                <TableCell align="left">{row.leave_applicant}</TableCell>
                                <TableCell align="left">{row.leave_type}</TableCell>
                                <TableCell align="left">{row.leave_start}</TableCell>
                                <TableCell align="left">{row.leave_end}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" sx={appBtn} onClick={(event) => handleClick(event, row.leave_id)}>অনুমোদন</Button>
                                    <Button size="small" sx={rejBtn}>প্রত্যাখ্যান</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}


