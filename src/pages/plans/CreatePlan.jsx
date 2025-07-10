import { useState } from 'react';
import { Button, Paper, Stack, TextField, Typography, Alert, Snackbar } from '@mui/material';
import axios from 'axios';

const CreatePlan = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://172.236.30.193:8008/api/plan/create', formData);
      handleClickAlert({
        message: res.data?.message || 'Plan created successfully!',
        severity: 'success',
      });
      setFormData({ title: '', price: '', duration: '', description: '' });
    } catch (err) {
      handleClickAlert({
        message: err.res?.data?.message || 'Something went wrong',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

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
        <Typography variant="h5" mb={3} color="primary.dark">
          Create New Plan
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ pt: 2 }}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Duration (in months)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={3}
              fullWidth
            />
            <Button
              sx={{ fontWeight: 400 }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Create Plan'}
            </Button>
          </Stack>
        </form>
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

export default CreatePlan;
