import React from 'react';
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../../../components/Header';
import useFetch from '../../organogram/useFetch';
import PropTypes from 'prop-types';







const sxButton =
{
    background: "#99C4C8", color: "black", border: "none", wordSpacing: "5px", textAlign: "left",
    borderRadius: "23px",
    "& .MuiButtonBase-root:hover":
    {
        background: "black !important",
    }
}


RecordForm.propTypes = {
    nRows: PropTypes.array,
  };

export default function RecordForm({nRows}) {
    const dayjs = require('dayjs');
    const toBn = n => n?.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
    
    
    const [svalue, setsValue] = React.useState("");
    const [rows, setRows] = React.useState(nRows);
    React.useEffect(() => {
        setRows(nRows);
    }, [nRows]);

// console.log(nRows);
    const sdateChange = (event)=>{
        event.preventDefault();
        setsValue(event.target.value);
    }
    const [evalue, seteValue] = React.useState("");


    const edateChange = (event)=>{
        event.preventDefault();
        seteValue(event.target.value);
    }

    // console.log(evalue);
    // const dayjs = require('dayjs');




const handleFilter = ()=>
{
    const row = nRows?.map((items)=> {if(dayjs(svalue).format("DD/MM/YYYY") >= dayjs(items?.leave_start).format("DD/MM/YYYY") && dayjs(items?.leave_end).format("DD/MM/YYYY") >= dayjs(evalue).format("DD/MM/YYYY")){return items}});

    setRows(row);
    // console.log(row);
}

    return (
        <div>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 210, borderBottom: "2px solid #99C4C8"}}>
                    <label htmlFor="leave_start">ছুটির  শুরু</label>
                    <input
                        type="date"
                        id="leave_start"
                        name="leave_start"
                        format="dd-mm-yyyy"
                    placeholder="dd-mm-yyyy"
                    value={svalue}
                    onChange={sdateChange}
                    sx={{
                        marginBottom: "20px",
                        display: "block"
                    }}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, mx: 10, minWidth: 210, borderBottom: "2px solid #99C4C8" }}>
                    <label htmlFor="leave_start">ছুটির শেষ</label>
                    <input
                        type="date"
                        id="leave_end"
                        name="leave_end"
                        format="dd-mm-yyyy"
                    placeholder="dd-mm-yyyy"
                    value={evalue}
                    onChange={edateChange}
                    sx={{
                        marginBottom: "20px",
                        display: "block"
                    }}
                    />
                </FormControl>
                <FormControl sx={{ mx: 10, my: 2.5, minWidth: 210, textAlign: "left" }}>
                    <Button variant="raised" component="label" sx={sxButton} onClick={handleFilter}>
                        <FilterAltSharpIcon />
                        ফিল্টার
                    </Button>
                </FormControl>
            </Box>
            <Box sx={{my:10}}>
            <Header title="নিজের ভোগকৃত ছুটির তালিকা"/>
            <TableContainer component={Paper} sx={{ minWidth: 450,
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
            }}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight:"bold !important"}}>ছুটির ধরন</TableCell>
                                <TableCell align="left" sx={{fontWeight:"bold !important"}}>ছুটির শুরু</TableCell>
                                <TableCell align="left" sx={{fontWeight:"bold !important"}}>ছুটির শেষ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row) => (
                                <TableRow
                                    key={row?.leave_type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row?.leave_type}
                                    </TableCell>
                                    <TableCell align="left">{row && toBn(dayjs(row?.leave_start).format("DD-MM-YYYY"))}</TableCell>
                                    <TableCell align="left">{row && toBn(dayjs(row?.leave_end).format("DD-MM-YYYY"))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
