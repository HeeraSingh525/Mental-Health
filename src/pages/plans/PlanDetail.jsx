import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Paper, Typography, Stack } from '@mui/material';
import axios from 'axios';

const PlanDetail = () => {
  const { id } = useParams(); // Get ID from route
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`http://localhost:5000/api/plan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlan(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error.main" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!plan) return null;

  return (
    <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Plan Details
      </Typography>

      <Stack spacing={2}>
        <Typography>
          <strong>Title:</strong> {plan.title}
        </Typography>
        <Typography>
          <strong>Price:</strong> ₹{plan.price}
        </Typography>
        <Typography>
          <strong>Duration:</strong> {plan.duration} months
        </Typography>
        <Typography>
          <strong>Description:</strong> {plan.description}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PlanDetail;
