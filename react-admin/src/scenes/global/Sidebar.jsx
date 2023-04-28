import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import SVGComponent from "./SVGComponent";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import RemoveDoneSharpIcon from '@mui/icons-material/RemoveDoneSharp';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import MediationOutlinedIcon from "@mui/icons-material/MediationOutlined";



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          position: "absolute",
          left:"10px",
          top: "5px",
          width:"280px",
          background: "#f5f5fa",
          boxShadow: "-10px -10px 30px 0 #fff,10px 1px 30px 0 #1d0dca17",
          borderRadius: "30px",
          border:"0",
          boxSizing:"border-box",
          color: "#2a1f62",
          transition: ".2s",
          whiteSpace: "pre",
          wordBreak: "normal",
          wordSpacing: "normal",
          height:"fit-content(100em)"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item": {
          background: "#f5f5fa",
          boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        },
        "& .pro-menu-item.active": {
          color: "#FC1555 !important",
        },
        "& .pro-inner-item:hover": {
          background:"rgba(202, 78, 121, 0.20)",
          color: "#FC1555 !important",
        },
        "& .MuiTreeItem-content":
        {
          padding:"15px",
          textAlign:"center",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          color:"black",
        },
        "& .Mui-expanded":
        {
          transition:"1s",
          color: "#25316D !important",
          border: "2px 0 0 0 solid #FC1555",
          boxShadow:"rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
        },
      }}
    >
      <ProSidebar>
        <Menu>
            {
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: "30px",
                  mt: "25px",
                }}
              >
                <SVGComponent />
              </Box>
            }

          <Box sx={{borderRadius:"20px"}}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 300}}
            >
              <TreeItem nodeId="0" label="অরগানোগ্রাম">
              <Item
                title="সামগ্রিক অরগানোগ্রাম"
                to="/EmployeeOrganogram"
                icon={<MediationOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              </TreeItem>
              <TreeItem nodeId="1" label="ছুটি">
              <Item
                title="ছুটির আবেদন"
                to="/LeaveApply"
                icon={<EmailOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="ছুটির রেকর্ড"
                to="/LeaveRecord"
                icon={<HistoryOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="আবেদনকৃত ছুটির স্ট্যাটাস"
                to="/LeaveStatus"
                icon={<FactCheckOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="ছুটি অনুমোদন/প্রত্যাখ্যান"
                to="/LeaveApproval"
                icon={<RemoveDoneSharpIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              </TreeItem>
              <TreeItem nodeId="2" label="উপস্থিতি">
              <Item
                title="উপস্থিতির স্ট্যাটাস "
                to="/AttendanceStatus"
                icon={<ContentPasteSearchIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="অধীনস্থদের দেরিতে প্রবেশ মওকুফ"
                to="/AttendanceLateApproval"
                icon={<RuleFolderIcon/>}
                selected={selected}
                setSelected={setSelected}
              />
              </TreeItem>
            </TreeView>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
