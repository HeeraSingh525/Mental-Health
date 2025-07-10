import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState();
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'right',
  });

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://172.236.30.193:8008/api/plan', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

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

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };
  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://172.236.30.193:8008/api/plan/${deletePlanId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans((prev) => prev.filter((plan) => plan._id !== deletePlanId));
      setConfirmDelete(false);
      handleClickAlert({
        message: 'Plan deleted successfully.',
        severity: 'success',
      });
    } catch (err) {
      handleClickAlert({
        message: err.response?.data?.message || 'Delete failed!',
        severity: 'error',
      });
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => `₹ ${params.value}`,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      renderCell: (params) => `${params.value} month${params.value > 1 ? 's' : ''}`,
    },
    { field: 'description', headerName: 'Description', flex: 3 },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1.5,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleView = () => {
          navigate(`/PlanList/${params.row._id}`);
        };

        const handleEdit = () => {
          navigate(`/PlanList/PlanEdit/${params.row._id}`);
        };

        return (
          <>
            <Tooltip title="View">
              <IconButton onClick={handleView}>
                <VisibilityIcon sx={{ color: '#1976d2' }} />
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
                  handleConfirmDelete(params.row._id);
                  setDeletePlanId(params.row._id);
                }}
              >
                <DeleteIcon sx={{ color: '#d32f2f' }} />
              </IconButton>
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
          mb={2}
        >
          <Typography variant="h5" color="primary.dark">
            All Plans
          </Typography>
          <Button
            sx={{ fontWeight: 400 }}
            variant="contained"
            onClick={() => {
              navigate('/CreatePlan');
            }}
          >
            Create Plan
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error.main">{error}</Typography>
        ) : (
          <DataGrid
            rows={plans.map((plan) => ({ ...plan, id: plan._id }))}
            columns={columns}
            // onRowClick={(params) => navigate(`/PlanList/${params.row._id}`)}
            apiRef={apiRef}
            // pageSizeOptions={[15, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        )}
      </Paper>

      <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this plan? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default PlanList;
