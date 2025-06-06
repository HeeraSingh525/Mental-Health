import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SearchFilter from '../../components/common/SearchFilter';
import CustomPagination from '../../components/common/CustomPagination';
import { Link } from 'react-router-dom';

const Users = () => {
  const apiRef = useGridApiRef();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // jkadfjkafb
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const formattedUsers = response.data.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          status: user.status || 'Active',
        }));

        setUsers(formattedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          className={`UserStatus`}
          color={params.value === 'Active' ? 'success.main' : 'error.main'}
        >
          <Link
            to={`/users/${users.map((user) => user.id)}`}
            style={{ textDecoration: 'none', color: 'blue' }}
          >
            {params.value}
          </Link>
        </Typography>
      ),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          User Management
        </Typography>
        <SearchFilter apiRef={apiRef} sx={{ maxWidth: 300 }} />
      </Stack>

      <Box sx={{ height: 420, width: 1, mt: 3 }}>
        <DataGrid
          apiRef={apiRef}
          rows={users}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
                page: 0,
              },
            },
          }}
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

export default Users;
