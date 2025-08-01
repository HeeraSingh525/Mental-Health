import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack } from '@mui/material';
import { sales as salesConfig } from '../../../../data/sales';
import SaleCard from './SaleCard';

const Sales = () => {
  const [sales, setSales] = useState(salesConfig);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://172.236.30.193:8008/api/user/count', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const { totalUsers, activeUsers, deactiveUsers } = response.data.data;

      const updatedSales = salesConfig.map((item) => {
        switch (item.key) {
          case 'TotalUsers':
            return { ...item, value: totalUsers?.toString() || '0' };
          case 'ActiveConversations':
            return { ...item, value: activeUsers?.toString() || '0' };
          case 'accuracy':
            return { ...item, value: '96%' };
          case 'mood':
            return { ...item, value: deactiveUsers?.toString() || '0' };
          default:
            return item;
        }
      });

      setSales(updatedSales);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Emotional Wellness Summary
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            A quick overview of key emotional wellness insights.
          </Typography>
        </div>
      </Stack>

      <Grid container spacing={{ xs: 3.875, xl: 2 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {sales.map((item) => (
          <Grid item xs={1} key={item.label}>
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;
