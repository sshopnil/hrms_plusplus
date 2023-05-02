import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import RecordForm from "./components/RecordForm";
import useFetch from '../organogram/useFetch';


function createData(leave_type, leave_start, leave_end) {
  return {leave_type, leave_start, leave_end};
}

export default function LeaveRecord() {
  const usr_id = sessionStorage.getItem('act_usr_id');
    const emp_leave_history = useFetch('http://localhost:5000/employee/'+usr_id);
    // console.log(emp_leave_history.leaves);
    let nRow = emp_leave_history.leaves?.filter((item)=> item?.leave_approval_status == 1);
    nRow = nRow?.map((item)=> createData(item?.leave_type.name, item?.leave_start_date,item?.leave_end_date));

  return (
    <div>
        <Box mx="60px">
          <Header
            title="ছুটির রেকর্ড"
          />
        <RecordForm nRows={nRow}/>
        </Box>
    </div>
  )
}
