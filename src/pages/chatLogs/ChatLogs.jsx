import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getColumns = (navigate) => [
  {
    field: 'user_id',
    headerName: 'User Id',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Stack>
        <Typography
          variant="h6"
          // component={Link}
          // onClick={() => navigate(`/ChatLogs/${params.row.id}`)}
          color="text.primary"
          sx={{ width: 'max-content', cursor: 'pointer' }}
        >
          {params.value}
        </Typography>
        <Typography variant="subtitle2">{params.row.userId}</Typography>
      </Stack>
    ),
  },
  // {
  //   field: 'emotion',
  //   headerName: 'Emotion',
  //   flex: 1,
  //   minWidth: 120,
  //   renderCell: (params) => {
  //     let color = '';
  //     switch (params.value) {
  //       case 'Sad':
  //         color = 'info.light';
  //         break;
  //       case 'Happy':
  //         color = 'success.light';
  //         break;
  //       case 'Anxious':
  //         color = 'warning.light';
  //         break;
  //       default:
  //         color = 'info.lighter';
  //     }
  //     return <Chip label={params.value} sx={{ bgcolor: color }} />;
  //   },
  // },
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    minWidth: 300,
  },
  {
    field: 'lastMessage',
    headerName: 'Message',
    flex: 2,
    minWidth: 300,
  },
  {
    field: 'viewLogs',
    headerName: 'Actions',
    flex: 1,
    minWidth: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        onClick={() => navigate(`/SingleChat/${params.row.user_id}`)}
      >
        View Logs
      </Button>
    ),
  },
];

const ChatLogs = () => {
  const apiRef = useGridApiRef();
  const navigate = useNavigate();
  const [chatLogs, setChatLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = getColumns(navigate);

  useEffect(() => {
    const fetchChatLogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://172.236.30.193:8008/api/chat/chatlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Make sure data is shaped properly for DataGrid
        const formatted = response.data.data.map((log, index) => ({
          ...log,
          id: log.id || index, // Ensure `id` is present for DataGrid
        }));

        setChatLogs(formatted);
        // console.log(formatted);
      } catch (err) {
        console.error('Error fetching chat logs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatLogs();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" color="primary.dark" mb={2}>
        Chat Logs
      </Typography>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          apiRef={apiRef}
          rows={chatLogs}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          disableColumnFilter
          disableColumnMenu
          disableDensitySelector
          hideFooterPagination
        />
      </Box>
      <Outlet />
    </Paper>
  );
};

export default ChatLogs;
