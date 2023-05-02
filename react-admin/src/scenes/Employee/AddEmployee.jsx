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
// import "bootstrap/dist/css/bootstrap.min.css";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const initialState = {
  address_perm: "",
  dob: null,
  address_curr: "",
  marital_status_id: "",
  phone: "",
  name: "",
  religion_id: "",
  user_name: "",
  user_image:""
};

const ModalForm = (props) => {
  const [religions, setReligions] = useState([]);
  const [martualStatus, setMaritualStatus] = useState([]);


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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});


  const [usr_img, setFile] = useState({currentFile: undefined,
    previewImage: undefined});

    // console.log(usr_img.currentFile.name);
    const selectFile=(event)=>{
      setFile({
        currentFile: event.target.files[0],
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
      marital_status_id: e.target.value,
    });
  };

  const handleReligionChange = (e) => {
    setFormData({
      ...formData,
      religion_id: e.target.value,
    });
  };

  // dayjs(toBn(formData.dob)).format("MM/DD/YYYY")
  const toBn = n => n?.replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);


  // console.log(typeof(formData.user_image));

    const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {
        "address_perm": formData.address_perm,
        "dob": dayjs(formData.dob).format("MM/DD/YYYY").toString(),
        "address_curr": formData.address_curr,
        "marital_status_id": formData.marital_status_id,
        "phone": formData.phone,
        "name": formData.name,
        "religion_id": formData.religion_id,
        "user_name": formData.user_name,
        "user_image":formData.user_image,
      }
      axios.post('http://localhost:5000/employee', obj)
      .then(response => {console.log(response); props.onShowDataAfterAdd(); setFile({
        currentFile: undefined,
        previewImage: undefined
      });})
      .catch(error => console.error(error));
      setFormData(initialState);
      
      handleClose();
      // window.location.reload();
    };

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
      <Box m={1} display="flex" justifyContent="flex-end" alignItem="flex-end">
        <p style={{ color: "black", padding: "10px" }}>এমপ্লয়ী যুক্ত করুন</p>

        <IconButton
          color="success"
          aria-label="add to shopping cart"
          onClick={handleOpen}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            bgcolor: "white",
            width: "75%",
            height: "90%",
            margin: "50px auto",
            boxShadow: 3,
            borderRadius: 2,
            display: "block",
            overflow: "scroll",
            color: "black",
            padding: "20px",
          }}
        >
          <Header sx={{ color: "success" }} title="কর্মকর্তা/কর্মচারী সংযোজন" />

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
                  <img src={usr_img.previewImage} alt="ছবি সংযুক্ত করা হয়নি" style={{height:"100px"}}/>
                  </div>
              <input type="file" accept="image/*" onChange={selectFile} id="selectedFile" ref={hiddenFileInput}/>
              <Button onClick={handleClick} className="custom-file-upload">
        ছবি আপলোড করুন
      </Button>
              </InputLabel>
              <TextField
                variant="standard"
                label="ব্যবহারকারীর নাম"
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
                label="পুরো নাম"
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
                label="ফোন"
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
                label="বর্তমান ঠিকানা"
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
                label="স্থায়ী ঠিকানা"
                name="address_perm"
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
                  value={formData.religion_id}
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
                  value={formData.marital_status_id}
                  onChange={handleMartualStatusChange}
                  fullWidth
                  required
                >
                  {martualStatus.map((marital) => (
                    <MenuItem key={marital.id} value={marital.id}>
                      {marital.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <label htmlFor="myDate">জন্ম তারিখ</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDobChange}
                />
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="end">
              <Box mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  সংযোজন
                </Button>
                <Button variant="contained" sx={{background:"red", marginLeft:"10px"}} onClick={handleClose}>
                  বাতিল
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalForm;
