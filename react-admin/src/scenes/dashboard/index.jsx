import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Grid";
import Header from "../../components/Header";
import AppCurrentVisits from "./components/AppCurrentVisits";
// import { useTheme } from '@mui/material/styles';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mx="60px">
      <Header
      title="ড্যাশবোর্ড"
      />

          <Grid item xs={12} md={6} lg={4} sx={{background:'#f5f5fa !important'}}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
    </Box>
  );
};

export default Dashboard;
