import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error.main">{error}</Typography>;

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Detail
      </Typography>
      <Box mt={2}>
        <Typography variant="h6">Name: {user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Status: {user.status}</Typography>
      </Box>
    </Paper>
  );
};

export default UserDetail;
