import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Stack, Paper, Typography, CircularProgress } from '@mui/material';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`http://172.236.30.193:8008/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        console.log('User details:', response.data.user);
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
    <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%', maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        User Detail
      </Typography>

      <Stack spacing={2}>
        <Typography sx={{ textTransform: 'capitalize' }}>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Id:</strong> {user._id}
        </Typography>
        <Typography>
          <strong>User Id:</strong> #{user.userId}
        </Typography>
        <Typography sx={{ textTransform: 'capitalize' }}>
          <strong>Status:</strong>{' '}
          <span style={{ color: user.status === 'active' ? '#00E096' : '#FA5A7D' }}>
            {user.status}
          </span>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default UserDetail;
