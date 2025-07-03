import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import SearchFilter from '../../components/common/SearchFilter';
import CustomPagination from '../../components/common/CustomPagination';
import { Switch, Tooltip, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {
  const apiRef = useGridApiRef();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (pageNumber = page, limit = pageSize, search = searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user?page=${pageNumber + 1}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const formattedUsers = response.data.data.map((user, index) => ({
        id: index + 1 + pageNumber * limit,
        name: user.name,
        mongoId: user._id,
        email: user.email,
        status: user.status,
      }));

      setUsers(formattedUsers);
      setRowCount(response.data.total);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, searchQuery]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
    },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 70,
      renderCell: (params) => (
        <Typography
          className={`UserStatus`}
          color={params.value === 'active' ? 'success.main' : 'error.main'}
        >
          {params.value === 'active' ? 'Active' : 'Deactive'}
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate(`/users/UserEdit/${params.row.mongoId}`);
        };
        const isActive = params.row.status === 'active';

        const handleToggle = async () => {
          // Example: You might want to call an API here like:
          try {
            await axios.post(
              `http://localhost:5000/api/user/status?id=${params.row.mongoId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            await fetchUsers();
            // Optionally, update local state or refresh data here
          } catch (error) {
            console.error('Error updating status:', error);
          }
        };

        const handleView = () => {
          navigate(`/users/${params.row.mongoId}`);
        };

        const handleDelete = async () => {
          try {
            const token = localStorage.getItem('authToken');
            console.log('params.row._id', params.row.mongoId);
            await axios.delete(`http://localhost:5000/api/user/${params.row.mongoId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (err) {
            alert('Delete failed!');
          } finally {
            fetchUsers();
          }
        };

        return (
          <>
            <Tooltip title="View">
              <IconButton onClick={handleView}>
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={handleEdit}>
                <EditIcon sx={{ color: '#ffa000' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <DeleteIcon sx={{ color: '#d32f2f' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={isActive ? 'Deactivate User' : 'Activate User'}>
              <Switch checked={isActive} onChange={handleToggle} color="primary" />
            </Tooltip>
          </>
        );
      },
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
          rows={users}
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
