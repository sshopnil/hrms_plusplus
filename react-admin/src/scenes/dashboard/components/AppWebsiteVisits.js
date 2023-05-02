import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';
import { Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData_prop: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string)
};

export default function AppWebsiteVisits({ title, subheader, chartLabels,chartData_prop,chartColors, ...other }) {

  const theme = useTheme();
  // console.log(chartData_prop);
  const chartData = useChart( {
    chart: {
      height:350,
      type: "bar",
      id: "apexchart-example",
      foreColor: chartColors
    },
    xaxis: {
      categories: chartLabels
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: chartColors,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100]
        // colorStops: []
      }
    },
    legend: {
      // position: '',
      width: 400
      // position: 'top',
    },
    series: [
      {
        name: "ছুটির পরিমাণ",
        type: "column",
        data: chartData_prop
      }
    ]
  });

  return (
    <Card {...other} sx={{background:'#f5f5fa !important'}}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr" id="chart">
        <ReactApexChart type="bar" options={chartData} series={chartData.series} height={364} />
      </Box>
    </Card>
  );
}
