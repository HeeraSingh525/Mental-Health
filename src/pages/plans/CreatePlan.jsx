import { useState } from 'react';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

const CreatePlan = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

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
    setSuccess('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/plan/create', formData);
      setSuccess('Plan created successfully!');
      console.log(res);
      setFormData({ title: '', price: '', duration: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
      <Typography variant="h5" mb={3} color="primary.dark">
        Create New Plan
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
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
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Create Plan'}
          </Button>
        </Stack>
      </form>

      {success && (
        <Typography mt={2} color="success.main">
          {success}
        </Typography>
      )}
      {error && (
        <Typography mt={2} color="error.main">
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default CreatePlan;
