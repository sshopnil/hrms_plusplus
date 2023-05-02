import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartColors: PropTypes.arrayOf(PropTypes.string)
};

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData,chartColors, ...other }) {
    console.log(chartData);
  const chartOptions = useChart({
    colors: chartColors,
    
    chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: chartColors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },

    xaxis: { categories: chartLabels, 
        labels: {
            style: {
              colors: chartColors,
              fontSize: '12px'
            }
          }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other} sx={{background:'#f5f5fa !important'}}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr" id="chart">
        <ReactApexChart type="bar" series={[{data: chartData}]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
