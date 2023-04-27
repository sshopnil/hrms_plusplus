import { Box, TextField, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect, React } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Header from "../../components/Header";
import ModalForm from "./AddEmployee";
import EditForm from "./EditForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EmlpoyeeList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [employeeData, setEmployeeData] = useState([]);
  const notifySuccessAddition = () => {toast.success("সংযুক্তি সফল হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};
  const notifySuccessEdit = () => {toast.success("হালনাগাদ সফল হয়েছে!", {position: toast.POSITION.BOTTOM_RIGHT})};


  useEffect(() => {
    axios.get("http://localhost:5000/employee").then((response) => {
      setEmployeeData(response.data);
    });
  }, []);

  const handleShowEmployee = () => {
    // Add new employee to the server
    axios
      .get("http://localhost:5000/employee")
      .then((response) => setEmployeeData(response.data))
      .catch((error) => console.error(error));
    notifySuccessAddition();
  };

  const handleShowAfterEdit = () => {
    // Edit new employee list
    axios
      .get("http://localhost:5000/employee")
      .then((response) => setEmployeeData(response.data))
      .catch((error) => console.error(error));
    notifySuccessEdit();
  };

  //Modal for Edit Finctionality
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
    console.log(row);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Table Column names
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user_name", headerName: "নাম" },
    {
      field: "phone",
      headerName: "ফোন",
      flex: 1,
      disableClickEventBubbling: true,
    },

    {
      field: "address_curr",
      headerName: "এড্রেস",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box mx="60px">
      <Header
        title="কর্মকর্তা/কর্মচারী "
        subtitle="কর্মকর্তা/কর্মচারীর তালিকা"
      />
      <Box mx="60" my={5} height="500px">
        <ModalForm onShowDataAfterAdd={handleShowEmployee} />

        <DataGrid
          rows={employeeData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
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
        />
      </Box>

      <Modal open={showModal} onClose={handleCloseModal}>
        <EditForm
          row={selectedRow}
          handleShowAfterEdit={handleShowAfterEdit}
          onClose={handleCloseModal}
        />
      </Modal>
      <ToastContainer/>
    </Box>
  );
};

export default EmlpoyeeList;
