import React, { useState } from 'react'
import { Box } from '@mui/material';
import Header from '../../components/Header';
import Calendar from './components/Calender';
import AttendanceTable from './components/AttendanceTable';
import useFetch from '../organogram/useFetch';
import DgridTable from './components/DgridTable';
import axios from 'axios';
import DateSelector from './components/DateSelector';

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
    const [query_date, setDate] = useState("");
    const [showTable, setShowTable] = useState(false);

    const handleDate = (val) => {
        setDate(val);
        (val != 'Invalid Date') ? setShowTable(true) : setShowTable(false);
    }
    return (
        <div>
            <Box mx="60px">
                <Header
                    title="উপস্থিতি সংরক্ষণ"
                />
                <DateSelector handleDate={handleDate} />
                {showTable && <AttendanceTable chunks={employee_rows} daily_attendance={daily_rows} handleAttendance={handleAttendance} handleDate={handleDate} query_date = {query_date}/>}
            </Box>
        </div>
    )
}

