import * as React from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import AttachFileSharpIcon from '@mui/icons-material/AttachFileSharp';
import { useFormik } from 'formik';
import useFetch from '../../organogram/useFetch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sxButton =
{
    background: "transparent", color: "black", border: "none", wordSpacing: "5px", borderBottom: "2px solid #99C4C8", textAlign: "left",

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

function reverseString(str) {
    return str.split("").reverse().join("");
}



export default function ApplyForm() {
    // const [file_, setFile] = React.useState("");
    
    // const handleSet =(e)=>
    // {
    //     e.preventDefault();
    //     const formData = new FormData();

	// 	formData.append('File', e.target.files[0]);
    //     console.log(formData);
    // }

    const leave_types = useFetch('http://localhost:5000/leave_type');
    // console.log(leave_types);
    const usr_name = sessionStorage.getItem('act_usr_name');
    const usr_list = useFetch('http://localhost:5000/employee');
    const usr_id = usr_list.filter((usr) => usr.user_name == usr_name);
    const notify = () => {toast.success("আপনার ছুটি সফলভাবে সিস্টেমে গৃহীত হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};
    const formik = useFormik(
        {
            initialValues: {
                leave_cat: "",
                leave_end: "",
                leave_start: "",
            },
            onSubmit: (values) => {
                const dayjs = require('dayjs');
                let start_date = dayjs(values.leave_start).format('MM-DD-YYYY');
                let end_date = dayjs(values.leave_end).format('MM-DD-YYYY');
                const obj = {
                    "leave_approval_status": 0,
                    "leave_end_date": end_date,
                    "employee_id": usr_id[0].id,
                    "leave_start_date": start_date,
                    "leave_type_id": values.leave_cat
                }

                console.log(obj);
                axios.post('http://localhost:5000/leave', obj)
                    .then(function (response) {
                        console.log(response);
                        // window.alert("successfully applied!");
                        notify();
                    })
                    .catch(function (error) {
                        console.log(error);
                        // window.alert("failed request!!");
                    });
                formik.handleReset();
                // window.alert("successfully applied!");
                // window.location.reload();
            }
        }
    );
    return (
        <div>
            <Box sx={{
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
                padding:"120px"
            }}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl sx={{ m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                        <label htmlFor="leave_start">ছুটির  শুরু</label>
                        <input
                            type="date"
                            id="leave_start"
                            name="leave_start"
                            value={formik.values.leave_start}
                            onChange={formik.handleChange}
                            format="yyyy-mm-dd"
                            placeholder="yyyy-mm-dd"
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, mx: 10, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                        <label htmlFor="leave_start">ছুটির শেষ</label>
                        <input
                            type="date"
                            id="leave_end"
                            name="leave_end"
                            format="yyyy-mm-dd"
                            placeholder="yyyy-mm-dd"
                            value={formik.values.leave_end}
                            required
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ mx: 10, m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                        <InputLabel id="leave_cat">ছুটির ধরন</InputLabel>
                        <Select
                            labelId="leave_cat"
                            id="leave_cat"
                            value={formik.values.leave_cat}
                            label="ছুটির ধরন"
                            name="leave_cat"
                            required
                            onChange={formik.handleChange}
                        >
                            {leave_types.map((info) => <MenuItem value={info.id}>{info.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl>
                    {/* <input type='file' onChange={(event)=>handleSet(event)} id="myfile" name="myfile"/> */}
                    </FormControl>
                    <Box sx={{ my: 10 }}>
                        <Button size="small" sx={appBtn} type='submit' name='submit'>আবেদন</Button>
                        <Button size="small" sx={rejBtn} onClick={formik.handleReset}>বাতিল</Button>
                    </Box>
                </form>
                <ToastContainer autoClose={2000}/>
            </Box>
        </div>
    )
}


{/* <FormControl fullWidth>
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
              </FormControl> */}