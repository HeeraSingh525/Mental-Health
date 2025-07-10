import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
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
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [selectDeleteUserId, setSelectDeleteUserId] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

  const handleDeleteUserClose = () => {
    setConfirmDeleteUser(false);
  };

  const fetchUsers = async (pageNumber = page, limit = pageSize, search = searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://172.236.30.193:8008/api/user?page=${pageNumber + 1}&limit=${limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const formattedUsers = response.data.data.map((user, index) => ({
        id: index + 1 + pageNumber * limit,
        name: user.name ? user.name : 'N/A',
        mongoId: user._id,
        email: user.email,
        status: user.status,
      }));

      setUsers(formattedUsers);
      setRowCount(response.data.total);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
      handleClickAlert({
        message: err.response?.data?.message || 'Failed to fetch users',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(
        `http://172.236.30.193:8008/api/user/${selectDeleteUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200 && response.data?.message === 'User deleted') {
        handleClickAlert({
          message: 'User deleted successfully.',
          severity: 'success',
        });
      } else {
        handleClickAlert({
          message: 'Failed to delete user. Please try again.',
          severity: 'error',
        });
      }
    } catch (err) {
      handleClickAlert({
        message: err.response?.data?.message || 'An error occurred while deleting the user.',
        severity: 'error',
      });
    } finally {
      handleDeleteUserClose();
      fetchUsers();
    }
  };

  const handleClickAlert = ({ vertical = 'top', horizontal = 'right', message, severity }) => {
    setSnackbar({
      open: true,
      message,
      severity,
      vertical,
      horizontal,
    });
  };

  const handleCloseAlert = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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
              `http://172.236.30.193:8008/api/user/toggle-status/${params.row.mongoId}`,
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
              <IconButton
                onClick={() => {
                  setConfirmDeleteUser(true);
                  setSelectDeleteUserId(params.row.mongoId);
                }}
              >
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
    <>
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

        <Box sx={{ height: 420, width: 1, my: 3 }}>
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
          <CustomPagination apiRef={apiRef} />
        </Box>

        {error && (
          <Typography mt={2} color="error.main">
            {error}
          </Typography>
        )}
      </Paper>

      {/* Alert toast Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        key={snackbar.vertical + snackbar.horizontal}
        anchorOrigin={{ vertical: snackbar.vertical, horizontal: snackbar.horizontal }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirm User Deletion Modal */}
      <Dialog open={confirmDeleteUser} onClose={handleDeleteUserClose}>
        <DialogTitle>Confirm User Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action is permanent and cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUserClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
