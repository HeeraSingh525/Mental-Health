import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Typography, CircularProgress, TextField, Button, Alert } from '@mui/material';

const PlanEdit = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState({ title: '', price: '', duration: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch plan on load
  useEffect(() => {
    const fetchplan = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://172.236.30.193:8008/api/plan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlan(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch plan');
      } finally {
        setLoading(false);
      }
    };

    fetchplan();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`http://172.236.30.193:8008/api/plan/${id}`, plan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Plan updated successfully!');
      console.log('response', response);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <CircularProgress />;
  if (error && !success) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Edit plan
      </Typography>

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Title"
          name="title"
          value={plan.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={plan.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (months)"
          name="duration"
          value={plan.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={plan.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Update plan
        </Button>
      </Box>
    </Paper>
  );
};

export default PlanEdit;
