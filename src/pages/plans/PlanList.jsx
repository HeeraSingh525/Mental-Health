import { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import axios from 'axios';
import SearchFilter from '../../components/common/SearchFilter';
import CustomPagination from '../../components/common/CustomPagination';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Tooltip } from '@mui/material';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/plan', {
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

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'duration', headerName: 'Duration', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
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
          navigate(`/PlanList/edit/${params.row._id}`);
        };

        const handleDelete = async () => {
          if (window.confirm('Are you sure you want to delete this plan?')) {
            try {
              const token = localStorage.getItem('authToken');
              await axios.delete(`http://localhost:5000/api/plan/${params.row._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setPlans((prev) => prev.filter((plan) => plan._id !== params.row._id));
            } catch (err) {
              alert('Delete failed!');
            }
          }
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
              <IconButton onClick={handleDelete}>
                <DeleteIcon sx={{ color: '#d32f2f' }} />
              </IconButton>
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
        mb={2}
      >
        <Typography variant="h5" color="primary.dark">
          All Plans
        </Typography>
        <SearchFilter apiRef={apiRef} sx={{ maxWidth: 350 }} />
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
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
        />
      )}

      <CustomPagination apiRef={apiRef} />
    </Paper>
  );
};

export default PlanList;
