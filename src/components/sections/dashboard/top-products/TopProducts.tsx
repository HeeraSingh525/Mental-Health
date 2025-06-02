import { Box, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Dummy data
const emotionRows = [
  {
    id: 1,
    user: { name: 'Aarav Singh', role: 'User' },
    emotion: 'Sadness',
    intensity: 7.8,
    frequency: 23,
  },
  {
    id: 2,
    user: { name: 'Neha Verma', role: 'User' },
    emotion: 'Anxiety',
    intensity: 8.2,
    frequency: 18,
  },
  {
    id: 3,
    user: { name: 'Rohit Kumar', role: 'User' },
    emotion: 'Happiness',
    intensity: 6.5,
    frequency: 12,
  },
  {
    id: 4,
    user: { name: 'Isha Jain', role: 'User' },
    emotion: 'Anger',
    intensity: 5.4,
    frequency: 7,
  },
];

const columns: GridColDef<(typeof emotionRows)[number]>[] = [
  {
    field: 'user',
    headerName: 'User',
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => (
      <Stack justifyContent="center" height={1}>
        <Typography
          variant="h6"
          component={Link}
          href="#!"
          color="text.primary"
          sx={{ width: 'max-content' }}
        >
          {params.row.user.name}
        </Typography>
        <Typography variant="subtitle2">{params.row.user.role}</Typography>
      </Stack>
    ),
  },
  {
    field: 'emotion',
    headerName: 'Emotion',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      let color = '';
      switch (params.value) {
        case 'Happiness':
          color = 'success.light';
          break;
        case 'Sadness':
          color = 'info.light';
          break;
        case 'Anxiety':
          color = 'warning.light';
          break;
        case 'Anger':
          color = 'error.light';
          break;
        default:
          color = 'default';
      }
      return <Chip label={params.value} sx={{ bgcolor: color }} />;
    },
  },
  {
    field: 'intensity',
    headerName: 'Avg. Intensity',
    flex: 1,
    minWidth: 150,
    valueFormatter: ({ value }) => `${value}/10`,
  },
  {
    field: 'frequency',
    headerName: 'Occurrences',
    flex: 1,
    minWidth: 120,
  },
];

const TopProducts = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          User Emotion Data
        </Typography>
      </Stack>

      <Box
        sx={{
          height: 400,
          width: 1,
          mt: 3,
        }}
      >
        <DataGrid
          columns={columns}
          rows={emotionRows}
          hideFooter
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  );
};

export default TopProducts;
