import { useParams } from 'react-router-dom';
import { Paper, Typography, Stack, Chip } from '@mui/material';

// Dummy data (same as in ChatLogs)
const chatLogs = [
  {
    id: 1,
    user: { name: 'Ananya Sharma', id: 'U101' },
    emotion: 'Sad',
    message: 'I feel so overwhelmed lately.',
    time: '2025-06-01 10:30 AM',
  },
  {
    id: 2,
    user: { name: 'Rahul Verma', id: 'U102' },
    emotion: 'Anxious',
    message: 'My anxiety keeps increasing at work.',
    time: '2025-06-01 11:00 AM',
  },
  {
    id: 3,
    user: { name: 'Priya Singh', id: 'U103' },
    emotion: 'Happy',
    message: 'The meditation tips helped me a lot!',
    time: '2025-06-01 12:00 PM',
  },
  {
    id: 4,
    user: { name: 'Aman Joshi', id: 'U104' },
    emotion: 'Angry',
    message: 'I’m tired of being ignored by my friends.',
    time: '2025-06-01 01:15 PM',
  },
  {
    id: 5,
    user: { name: 'Neha Patel', id: 'U105' },
    emotion: 'Confused',
    message: 'I don’t know what to do about my relationship.',
    time: '2025-06-01 02:00 PM',
  },
  {
    id: 6,
    user: { name: 'Vikram Mehta', id: 'U106' },
    emotion: 'Depressed',
    message: 'I haven’t felt good in weeks.',
    time: '2025-06-01 03:45 PM',
  },
  {
    id: 7,
    user: { name: 'Sneha Reddy', id: 'U107' },
    emotion: 'Hopeful',
    message: 'I think I’m finally seeing some progress.',
    time: '2025-06-01 04:30 PM',
  },
  {
    id: 8,
    user: { name: 'Ravi Kumar', id: 'U108' },
    emotion: 'Lonely',
    message: 'I feel like I have no one to talk to.',
    time: '2025-06-01 05:00 PM',
  },
  {
    id: 9,
    user: { name: 'Divya Nair', id: 'U109' },
    emotion: 'Relaxed',
    message: 'I tried yoga today and it helped a lot.',
    time: '2025-06-01 06:00 PM',
  },
  {
    id: 10,
    user: { name: 'Manoj Sinha', id: 'U110' },
    emotion: 'Stressed',
    message: 'Deadlines are killing me.',
    time: '2025-06-01 06:45 PM',
  },
  {
    id: 11,
    user: { name: 'Kritika Desai', id: 'U111' },
    emotion: 'Grateful',
    message: 'Thank you for listening. It means a lot.',
    time: '2025-06-01 07:10 PM',
  },
  {
    id: 12,
    user: { name: 'Abhishek Rao', id: 'U112' },
    emotion: 'Frustrated',
    message: 'I keep trying but nothing changes.',
    time: '2025-06-01 07:45 PM',
  },
  {
    id: 13,
    user: { name: 'Pooja Bhatt', id: 'U113' },
    emotion: 'Optimistic',
    message: 'Things are getting better slowly.',
    time: '2025-06-01 08:15 PM',
  },
  {
    id: 14,
    user: { name: 'Siddharth Jain', id: 'U114' },
    emotion: 'Scared',
    message: 'I have panic attacks every night.',
    time: '2025-06-01 09:00 PM',
  },
  {
    id: 15,
    user: { name: 'Ritika Agarwal', id: 'U115' },
    emotion: 'Motivated',
    message: 'I’ve started journaling and it’s helping.',
    time: '2025-06-01 09:45 PM',
  },
];

const SingleChat = () => {
  const { id } = useParams();
  const chat = chatLogs.find((log) => log.id === parseInt(id));

  if (!chat) {
    return <Typography variant="h6">Chat not found</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Chat Details
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h6">
          <strong>User:</strong> {chat.user.name} ({chat.user.id})
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
