import { Box, Paper, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SearchFilter from '../../components/common/SearchFilter';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import CustomPagination from '../../components/common/CustomPagination';

const getColumns = () => [
  {
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ pt: 2 }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            cursor: 'pointer',
            transition: 'color 0.2s',
            textTransform: 'capitalize',
            fontSize: 16,
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {params.row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ cursor: 'pointer' }}>
          {params.row.lastMessage}
        </Typography>
      </Box>
    ),
  },
];

const ChatLogs = () => {
  const apiRef = useGridApiRef();
  const [chatLogs, setChatLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [singalChatLoading, setSingalChatLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = getColumns();

  const fetchChatLogs = async (search = '') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://172.236.30.193:8008/api/chat/chatlist?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const formatted = response.data.data.map((log, index) => ({
        ...log,
        id: log.id || index,
      }));

      setChatLogs(formatted);
    } catch (err) {
      console.error('Error fetching chat logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatLogs(searchQuery);
  }, [searchQuery]);

  const handleChatSelect = async (row) => {
    const userId = row.userId;
    setSelectedChat(row);
    setSingalChatLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`http://172.236.30.193:8008/api/chat?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChatMessages(res.data.data);
      setSingalChatLoading(false);
    } catch (error) {
      console.error('Error fetching single chat:', error);
      setChatMessages([]);
    }
  };

  useEffect(() => {
    console.log('Selected chat changed:', selectedChat);
  }, [selectedChat]);

  return (
    <>
      {chatLogs.length === 0 && loading === false ? (
        <Paper
          sx={{
            width: '100%',
            p: 2,
            textAlign: 'center',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No Chats"
            width={120}
            style={{ opacity: 0.6, marginBottom: 16 }}
          />
          <Typography variant="h6" color="text.secondary">
            No chats found
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', height: '60vh' }}>
          {/* Left Side: Chat List */}

          <Paper sx={{ width: '35%', p: 2 }} className="chat-list-page">
            <Typography variant="h5" color="primary.dark" mb={3}>
              Chats
            </Typography>
            <SearchFilter
              apiRef={apiRef}
              sx={{ maxWidth: 300 }}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
              }}
            />
            <Box
              sx={{
                mb: 2,
                '& .MuiDataGrid-columnHeaders': {
                  display: 'none',
                },
                '& .active-chat-row': {
                  backgroundColor: '#e3f2fd',
                  '&:hover': {
                    backgroundColor: '#bbdefb',
                  },
                },
              }}
            >
              <DataGrid
                apiRef={apiRef}
                rows={chatLogs}
                columns={columns}
                loading={loading}
                pageSizeOptions={[5, 10]}
                disableDensitySelector
                hideFooterPagination
                onRowClick={(params) => handleChatSelect(params.row)}
                getRowClassName={(params) =>
                  params.row.chatId === selectedChat?.userId ? 'active-chat-row' : ''
                }
              />
            </Box>
            <CustomPagination apiRef={apiRef} />
          </Paper>
          {/* Right Side: Chat Details */}
          <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f7f7f7', width: '70%' }}>
            {singalChatLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 2,
                  height: '60vh',
                }}
              >
                <CircularProgress size={30} color="primary" />
              </Box>
            ) : selectedChat && !singalChatLoading ? (
              <>
                <Typography
                  variant="h6"
                  color="primary"
                  mb={2}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Chat with: {selectedChat.name || 'Unknown User'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50vh',
                    overflowY: 'auto',
                    pr: 1,
                  }}
                >
                  {chatMessages.length > 0 ? (
                    chatMessages.map((msg, i) => (
                      <>
                        {msg.text && (
                          <Paper
                            key={`text-${i}`}
                            sx={{
                              p: 1.5,
                              my: 1,
                              maxWidth: '75%',
                              alignSelf: 'flex-start',
                              backgroundColor: '#e3f2fd',
                            }}
                          >
                            <Typography variant="body2">{msg.text}</Typography>
                          </Paper>
                        )}

                        {msg.reply && (
                          <Paper
                            key={`reply-${i}`}
                            sx={{
                              p: 1.5,
                              my: 1,
                              maxWidth: '75%',
                              alignSelf: 'flex-end',
                              backgroundColor: '#c8e6c9',
                            }}
                          >
                            <Typography variant="body2">{msg.reply}</Typography>
                          </Paper>
                        )}
                      </>
                    ))
                  ) : (
                    <Typography color="text.secondary">No chat messages found.</Typography>
                  )}
                </Box>
              </>
            ) : (
              <Paper
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  width: '100%',
                  p: 0,
                  m: 0,
                  textAlign: 'center',
                  height: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src="./public/imgs/messenger-concept-illustration_1.png" // empty chat icon
                  alt="No Chats"
                  width={380}
                  style={{ marginBottom: 16 }}
                />
              </Paper>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatLogs;
