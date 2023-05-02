import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AppCurrentVisits from "./components/AppCurrentVisits";
// import { useTheme } from '@mui/material/styles';
import EmployeeCalander from "./components/EmployeeCalander";
import useFetch from "../organogram/useFetch";
import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import PropTypes from 'prop-types';
import AppWebsiteVisits from "./components/AppWebsiteVisits";


function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const leave_all_types = useFetch('http://localhost:5000/leave/all_types');

  const Data = leave_all_types?.map((item) => { return { label: item.type_name, value: item.type_count } })
  return (
    <div>
      <Box mx="60px">
      <Header
          title="ড্যাশবোর্ড"
        />
      </Box>
      <Box mx="60px" sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Item>
        <AppCurrentVisits
            title="ছুটি"
            chartData={Data}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.success.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Item>
        <Item>
        <AppWebsiteVisits
              title="Website Visits"
              chartLabels={[
                ['John Doe'],
                  ['Joe Smith'],
                  ['Jake Williams'],
                  ['Amber'],
                  ['Peter Brown'],
                  ['Mary Evans'],
                  ['David Wilson'],
                  ['Lily Roberts'], 
              ]}
              chartData={[21, 22, 10, 28, 16, 21, 13, 30]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Item>
      </Box>
      <Box mx="60px" sx={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <Item>
          <EmployeeCalander />
        </Item>
      </Box>
    </div>
  );
};

export default Dashboard;




// chartData={[
//   {
//     name: 'Team A',
//     type: 'column',
//     fill: 'solid',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//   },
//   {
//     name: 'Team B',
//     type: 'area',
//     fill: 'gradient',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//   },
//   {
//     name: 'Team C',
//     type: 'line',
//     fill: 'solid',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//   },
// ]}