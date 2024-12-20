import { Box, IconButton, useTheme, TextField, Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import Logout from "@mui/icons-material/Logout";
import { ChangeCircleSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import  axios  from "axios";
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Topbar = (props) => {
  const notify = () => { toast.success("পাসওয়ার্ড পরিবর্তন করা হয়েছে!", { position: toast.POSITION.BOTTOM_LEFT }) };
  // const [user_name, setCurrentUserName] = useState();
  const [password, setCurrentPassword] = useState();
  const [cpassword, setConfirmPassword] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandle = () => {
    handleClose();
    // sessionStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
    
    sessionStorage.setItem("active_user", "none");
  };

  const handlePasswordChange = () => {
    setOpenDialog(true);
  };

  

  const handlePasswordChangeCloseDialog = async (event) => {
    event.preventDefault();
    const user = sessionStorage.getItem('act_usr_name');
    console.log(user, password);
    if(password == cpassword)
    {
      try {
        const response = await axios.post(
          "http://localhost:5000/employee/change_password",
          {
            "user_name": user.toString(),
            "password": password.toString(),
          }
        );
  
        // console.log(response.data.change_password_status);
      } catch (error) {
        // Handle API call error
      }
      notify();
      setOpenDialog(false);
      setConfirmPassword("");
      setCurrentPassword("");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Dialog open={openDialog} onClose={handleClose}>
        <form onSubmit={handlePasswordChangeCloseDialog}>
          <DialogTitle>পাসওয়ার্ড পরিবর্তন করুন</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="নতুন পাসওয়ার্ড"
              fullWidth
              variant="standard"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={cpassword}
            />

            <TextField
              autoFocus
              margin="dense"
              id="confirm_password"
              label="পাসওয়ার্ড নিশ্চিত করুন"
              fullWidth
              variant="standard"
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>বাতিল</Button>

            <Button type="submit">পরিবর্তন</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box
        display="flex"
        borderRadius="50px"
        marginLeft="auto"
        sx={{
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
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Box sx={{ m: 2, textTransform: "uppercase" }}>
          {sessionStorage.getItem("act_usr_name")}
        </Box>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 15 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/* sessionStorage.setItem('act_usr_name', username); */}
          <Avatar src={process.env.PUBLIC_URL+"/user_images/"+sessionStorage.getItem("act_usr_img")}/>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#f5f5fa",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handlePasswordChange}>
          <ListItemIcon>
            <ChangeCircleSharp fontSize="small" />
          </ListItemIcon>
          পাসওয়ার্ড পরিবর্তন করুন
        </MenuItem>

        <MenuItem onClick={logOutHandle} activeClassName="is-active" to="/">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          লগ-আউট
        </MenuItem>
      </Menu>
      {/* <ToastContainer /> */}
    </Box>
    
  );
};

export default Topbar;
