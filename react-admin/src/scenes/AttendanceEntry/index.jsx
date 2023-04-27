import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from '../../components/Header';
import Calendar from './components/Calender';
import AttendanceTable from './components/AttendanceTable';
import useFetch from '../organogram/useFetch';
import DgridTable from './components/DgridTable';
import axios from 'axios';

export default function Index() {
    const [employee_rows, SetRows] = useState([]);
    const [daily_rows, SetAtt] = useState([]);

    const chunks = useFetch("http://localhost:5000/employee");
    const daily_attendance = useFetch("http://localhost:5000/daily_attendance");

    React.useEffect(() => {
        SetRows(chunks);
    }, [chunks]);

    React.useEffect(() => {
        SetAtt(daily_attendance);
    }, [daily_attendance]);

    const handleAttendance = ()=>
    {
        axios
      .get("http://localhost:5000/daily_attendance")
      .then((response) => SetAtt(response.data))
      .catch((error) => console.error(error));
    }
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতি সংরক্ষণ"
                />
                <AttendanceTable chunks={employee_rows} daily_attendance={daily_rows} handleAttendance={handleAttendance}/>
            </Box>
        </div>
    )
}

