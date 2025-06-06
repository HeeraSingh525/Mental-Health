import { Box, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import CustomPagination from '../../components/common/CustomPagination';
import SearchFilter from '../../components/common/SearchFilter';
import { useNavigate, Outlet } from 'react-router-dom';

// Dummy chat log rows
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
const getColumns = (navigate) => [
  {
    field: 'user',
    headerName: 'User',
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Stack>
        <Typography
          variant="h6"
          component={Link}
          onClick={() => navigate(`/ChatLogs/${params.row.id}`)}
          color="text.primary"
          sx={{ width: 'max-content' }}
        >
          {params.value.name}
        </Typography>
        <Typography variant="subtitle2">{params.value.id}</Typography>
      </Stack>
    ),
  },
  {
    field: 'emotion',
    headerName: 'Emotion',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => {
      let color = '';
      switch (params.value) {
        case 'Sad':
          color = 'info.light';
          break;
        case 'Happy':
          color = 'success.light';
          break;
        case 'Anxious':
          color = 'warning.light';
          break;
        default:
          color = 'info.lighter';
      }
      return <Chip label={params.value} sx={{ bgcolor: color }} />;
    },
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 2,
    minWidth: 300,
  },
  {
    field: 'time',
    headerName: 'Timestamp',
    flex: 1,
    minWidth: 180,
  },
];

const ChatLogs = () => {
  const apiRef = useGridApiRef();
  const navigate = useNavigate(); // Move inside component

  const columns = getColumns(navigate); // Get columns with navigate

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          Chat Logs
        </Typography>
        <SearchFilter apiRef={apiRef} sx={{ maxWidth: 350 }} />
      </Stack>

      <Box sx={{ height: 420, width: '100%', mt: 3 }}>
        <DataGrid
          apiRef={apiRef}
          rows={chatLogs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </Box>

      <CustomPagination apiRef={apiRef} />
      <Outlet />
    </Paper>
  );
};

export default ChatLogs;
