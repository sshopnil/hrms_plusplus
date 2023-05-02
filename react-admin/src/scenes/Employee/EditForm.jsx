import { useState, useEffect } from "react";
import * as React from "react";
import {
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const initialState = {
  address_perm: "",
  dob: null,
  address_curr: "",
  marital_status_id: "",
  phone: "",
  name: "",
  religion_id: "",
  user_name: "",
  user_image:"",
};



const EditForm = ({ row, handleShowAfterEdit, onClose}) => {
//   const [name, setName] = useState(props.user_name);
//   const [phone, setPhone] = useState(props.phone);

  
  //const id = row.id;
  // console.log(row);
  const  {address_perm,dob,address_curr,marital_status,phone,name,religion,user_name,id, user_image} = row;

  

  const [religions, setReligions] = useState([]);
  const [maritalStatuss, setMaritualStatus] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5000/religion").then((response) => {
      setReligions(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/marital_status").then((response) => {
      setMaritualStatus(response.data);
    });
  }, []);

  const toEn = n => n.replace(/[ ০ - ৯]/g, d => "০১২৩৪৫৬৭৮৯".indexOf(d));
  const dayjs = require('dayjs');
  const toBn = n => n?.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
  
  const  newRow = {address_perm,dob,address_curr,marital_status,phone,name,religion,user_name, user_image};
  // console.log(newRow);
  const [formData, setFormData] = useState(newRow);
  const [errors, setErrors] = useState({});


  const [usr_img, setFile] = useState({currentFile: "",
    previewImage: undefined});

    // console.log(usr_img.currentFile.name);
    const selectFile=(event)=>{
      setFile({
        currentFile: event.target.files[0].name,
        previewImage: URL.createObjectURL(event.target.files[0])
      });
      setFormData({
        ...formData,
        user_image: event.target.files[0].name,
      });
    };
  const handleUserNameChange = (e) => {
    setFormData({
      ...formData,
      user_name: e.target.value,
    });
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleUserPhoneNoChange = (e) => {
    setFormData({
      ...formData,
      phone: e.target.value,
    });
  };

  const handleUserCurrentAddressChange = (e) => {
    setFormData({
      ...formData,
      address_curr: e.target.value,
    });
  };

  const handlePermanentAddressChange = (e) => {
    setFormData({
      ...formData,
      address_perm: e.target.value,
    });
  };

  const handleDobChange = (e) => {
    setFormData({
      ...formData,
      dob: e.target.value,
    });
  };

  const handleMartualStatusChange = (e) => {
    setFormData({
      ...formData,
      marital_status:{
        id : e.target.value,
      }
    });
  };

  const handleReligionChange = (e) => {
    setFormData({
      ...formData,
      religion:{
        id: e.target.value,
      }
    });
  };

  

    const handleSubmit = (e) => {
      // console.log(row);
      // console.log(formData);
      let u_img = usr_img.currentFile;
      if(usr_img.currentFile == "")
      {
        u_img = formData.user_image;
      }
      const obj = {
          "religion_id": formData.religion.id,
          "address_perm": formData.address_perm,
          "marital_status_id": formData.marital_status.id,
          "dob": dayjs(formData.dob).format("MM/DD/YYYY").toString(),
          "address_curr": formData.address_curr,
          "name": formData.name,
          "user_name": formData.user_name,
          "phone": formData.phone,
          "user_image":u_img,
      }
      onClose();
      e.preventDefault();
      axios.put('http://localhost:5000/employee/'+row.id, obj)
      .then(response => {console.log(response); handleShowAfterEdit();})
      .catch(error => console.error(error));
      setFormData(initialState);
    };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   e.target.reset();
  //   setFormData(initialState);
  // };

  const validate = (data) => {
    const errors = {};
    if (!data.USER_NAME) {
      errors.USER_NAME = "Username is required";
    }
    if (!data.NAME) {
      errors.NAME = "Name is required";
    }
    if (!data.PHONE) {
      errors.PHONE = "Phone number is required";
    }
    if (!data.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!data.currentAddress) {
      errors.currentAddress = "Current address is required";
    }
    if (!data.permanentAddress) {
      errors.permanentAddress = "Permanent address is required";
    }
    if (!data.maritalStatus) {
      errors.maritalStatus = "Marital status is required";
    }
    if (!data.religion) {
      errors.religion = "Religion is required";
    }
    if (!data.email) {
      errors.email = "Emial is Required";
    }
    return errors;
  };

  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <Box>
        <Box
          sx={{
            bgcolor: "white",
            width: "75%",
            height: "50%",
            margin: "150px auto",
            boxShadow: 3,
            borderRadius: 2,
            display: "block",
            overflow: "scroll",
            color: "black",
            padding: "20px",
          }}
        >
          <Header sx={{ color: "success" }} title="কর্মকর্তা/কর্মচারীর তথ্য পরিবর্তন " />

          <form onSubmit={handleSubmit}>
          <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                gridColumn: "span 4",
                color: "black",
              }}
            >
              
              <InputLabel sx={{margin:"auto", alignItems:"center"}}>
                  <div>
                  <img src={process.env.PUBLIC_URL+"/user_images/"+formData.user_image} alt="ছবি সংযুক্ত করা হয়নি" style={{height:"100px"}}/>
                  </div>
              <input type="file" accept="image/*" onChange={selectFile} id="selectedFile" ref={hiddenFileInput}/>
              <Button onClick={handleClick} className="custom-file-upload">
        Upload a file
      </Button>
              </InputLabel>
              <TextField
                variant="standard"
                label="Username"
                name="user_name"
                value={formData.user_name}
                onChange={handleUserNameChange}
                fullWidth
                required
                error={!!errors.user_name}
                helperText={errors.user_name}
              />

              <TextField
                variant="standard"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                variant="standard"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleUserPhoneNoChange}
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <TextField
                variant="standard"
                label="Current Address"
                name="address_curr"
                value={formData.address_curr}
                onChange={handleUserCurrentAddressChange}
                fullWidth
                required
                error={!!errors.currentAddress}
                helperText={errors.currentAddress}
              />

              <TextField
                variant="standard"
                label="Permanent Address"
                name="ddress_perm"
                value={formData.address_perm}
                onChange={handlePermanentAddressChange}
                fullWidth
                required
                error={!!errors.permanentAddress}
                helperText={errors.permanentAddress}
              />

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  ধর্ম
                </InputLabel>
                <Select
                  labelId="religion-label"
                  id="religion"
                  name="religion_id"
                  value={formData.religion.id}
                  onChange={handleReligionChange}
                  fullWidth
                  required
                >
                  {religions.map((religion) => (
                    <MenuItem key={religion.id} value={religion.id}>
                      {religion.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  বৈবাহিক অবস্থা
                </InputLabel>
                <Select
                  labelId="religion-label"
                  id="religion"
                  name="marital_status_id"
                  value={formData.marital_status.id}
                  onChange={handleMartualStatusChange}
                  fullWidth
                  required
                >
                  {maritalStatuss.map((marital) => (
                    <MenuItem key={marital.id} value={marital.id}>
                      {marital.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <label htmlFor="myDate">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={dayjs(toEn(formData.dob)).format("YYYY-MM-DD")}
                  onChange={handleDobChange}
                />
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                তথ্য হালনাগাদ 
                </Button>
                <Button variant="contained" sx={{background:"red", marginLeft:"10px"}} onClick={onClose}>
                  বাতিল
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      
    </Box>
  );
};

export default EditForm;
