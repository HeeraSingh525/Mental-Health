import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';

const PlanEdit = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState({ title: '', price: '', duration: '', description: '' });
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

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
        handleClickAlert({
          message: err.response?.data?.message || 'Failed to fetch plan',
          severity: 'error',
        });
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
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`http://172.236.30.193:8008/api/plan/${id}`, plan, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClickAlert({
        message: response.data?.message || 'Plan updated successfully!',
        severity: 'success',
      });
    } catch (err) {
      handleClickAlert({
        message: err.response?.data?.message || 'Update failed',
        severity: 'error',
      });
    }
  };

  if (loading) return <CircularProgress />;

  const handleClickAlert = ({ vertical = 'top', horizontal = 'right', message, severity }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      vertical,
      horizontal,
    });
  };

  const handleCloseAlert = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Edit plan
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={2}>
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
          <Button variant="contained" type="submit" sx={{ mt: 2, fontWeight: 400 }}>
            Update Plan
          </Button>
        </Box>
      </Paper>

      {/* Alert toast Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        key={snackbar.vertical + snackbar.horizontal}
        anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlanEdit;
