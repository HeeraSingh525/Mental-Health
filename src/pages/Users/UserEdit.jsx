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
  Snackbar,
  Alert,
} from '@mui/material';

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

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

  // Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://172.236.30.193:8008/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.log(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit for edit user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`http://172.236.30.193:8008/api/user/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        handleClickAlert({
          message: response.data?.message || 'User updated successfully!',
          severity: 'success',
        });
      } else {
        handleClickAlert({
          message: 'Something went wrong. Please try again.',
          severity: 'error',
        });
      }
    } catch (err) {
      handleClickAlert({
        message: err.response?.data?.message || 'Failed to update user. Please try again.',
        severity: 'error',
      });
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Edit User
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" type="submit" sx={{ mt: 2, fontWeight: 400 }}>
            Update User
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

export default UserEdit;
