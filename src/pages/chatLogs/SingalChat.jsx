import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';

const SingleChat = () => {
  const { id } = useParams(); // This is user_id passed from navigate
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatByUserId = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://172.236.30.193:8008/api/chat/`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChat(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching single chat:', error);
        setChat(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChatByUserId();
  }, [id]);

  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">
          Loading...
          <CircularProgress size={20} sx={{ ml: 1 }} />
        </Typography>
      </Paper>
    );
  }

  if (!chat) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Chat not found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chat Details
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h6">
          <strong>User:</strong> {chat.user?.name} ({chat.user?.id})
        </Typography>

        <Typography>
          <strong>Time:</strong> {chat.time}
        </Typography>

        <Typography>
          <strong>Emotion:</strong> <Chip label={chat.emotion} color="primary" />
        </Typography>

        <Typography>
          <strong>Message:</strong> {chat.message}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SingleChat;
