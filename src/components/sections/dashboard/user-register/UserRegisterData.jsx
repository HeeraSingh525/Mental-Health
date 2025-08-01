import { useEffect, useRef, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import * as echarts from 'echarts';
import axios from 'axios';

const UserRegisterData = () => {
  const chartRef = useRef(null);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.236.30.193:8008/api/user/userRegistered', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user registration data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Init chart
      const myChart = echarts.init(chartRef.current, 'light');

      const option = {
        xAxis: {
          type: 'category',
          data: userData.map((item) => item.month),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: userData.map((item) => item.count),
            type: 'line',
            areaStyle: {},
          },
        ],
      };

      myChart.setOption(option);

      // Optional: Resize on window resize
      const handleResize = () => myChart.resize();
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, [userData]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" color="primary.dark" mb={1.375}>
        Monthly User Registrations
      </Typography>

      <div ref={chartRef} style={{ width: '100%', height: 400 }} />
    </Paper>
  );
};

export default UserRegisterData;
