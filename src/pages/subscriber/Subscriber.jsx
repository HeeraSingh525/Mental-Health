import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SearchFilter from '../../components/common/SearchFilter';
import CustomPagination from '../../components/common/CustomPagination';

const Subscriber = () => {
  const [loading, setLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const apiRef = useGridApiRef();
  const [error, setError] = useState('');

  const columns = [
    { field: 'userName', headerName: 'Name', width: 150 },
    {
      field: 'userEmail',
      headerName: 'Email',
      flex: 1,
      minWidth: 230,
    },
    { field: 'duration', headerName: 'Duration', flex: 1.5, minWidth: 200 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 70,
    },
    { field: 'description', headerName: 'Description', flex: 1.5, minWidth: 200 },
  ];

  const fetchSubscribers = async (pageNumber = page, limit = pageSize, search = searchQuery) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `http://172.236.30.193:8008/api/subscriber?page=${pageNumber + 1}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSubscribers(response.data.data);
      setRowCount(response.data.total);
      console.log(subscribers);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [page, pageSize, searchQuery]);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          Subscriber Management
        </Typography>
        <SearchFilter
          apiRef={apiRef}
          sx={{ maxWidth: 300 }}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            setPage(0);
          }}
        />
      </Stack>

      <Box sx={{ height: 420, width: 1, mt: 3 }}>
        <DataGrid
          apiRef={apiRef}
          rows={subscribers}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          rowCount={rowCount}
          getRowId={(row) => row.planId}
        />
      </Box>

      <CustomPagination apiRef={apiRef} />

      {error && (
        <Typography mt={2} color="error.main">
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default Subscriber;
