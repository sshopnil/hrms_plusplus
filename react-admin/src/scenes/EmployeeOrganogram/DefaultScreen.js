import React, { useCallback } from 'react';

import 'reactflow/dist/base.css';

import './index.css';

import Header from "../../components/Header";
import { Box } from '@mui/material';


export default function defaultScreen(props) {
    const {setOpen, open} = props;
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (e) => {
      setOpen(false);
    };
  
    return (
      <div className="layoutflow">
  
        {/* header  */}
  
        <Box m="20px" onClick={handleClose}>
          <Header
            title="অরগানোগ্রাম"
            subtitle="সামগ্রিক অরগানোগ্রাম"
          />
        </Box>
        <Box m={50}>
          <Header subtitle="no entry entered"/>
        </Box>
      </div>
    );
}
