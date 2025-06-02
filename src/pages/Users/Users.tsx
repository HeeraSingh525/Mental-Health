import { Box, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import SearchFilter from 'components/common/SearchFilter';
import CustomPagination from 'components/common/CustomPagination';

const rows = [
  { id: 1, name: 'Aarav Mehta', email: 'aarav@example.com', status: 'Active' },
  { id: 2, name: 'Sana Kapoor', email: 'sana@example.com', status: 'Inactive' },
  { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', status: 'Active' },
  { id: 4, name: 'Ishita Das', email: 'ishita@example.com', status: 'Active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', status: 'Inactive' },
  { id: 6, name: 'Neha Rathi', email: 'neha@example.com', status: 'Active' },
  { id: 7, name: 'Rohit Kumar', email: 'rohit@example.com', status: 'Active' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <Typography color={params.value === 'Active' ? 'success.main' : 'error.main'}>
        {params.value}
      </Typography>
    ),
  },
];

const Users = () => {
  const apiRef = useGridApiRef();

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
          rows={rows}
          columns={columns}
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
    </Paper>
  );
};

export default Users;
