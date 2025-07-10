import { Box, Paper, Typography, Stack, Divider } from '@mui/material';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'Welcome!',
      message: 'Thanks for joining our platform.',
      date: '2024-07-09',
    },
    {
      id: 2,
      title: 'Update Available',
      message: 'A new version of the app is now available.',
      date: '2024-07-08',
    },
    {
      id: 3,
      title: 'Reminder',
      message: 'Don’t forget to complete your profile.',
      date: '2024-07-07',
    },
  ];

  return (
    <Paper sx={{ p: 3, mx: 'auto', mt: 0, width: '100%' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>

        <Stack spacing={2} sx={{ py: 3 }}>
          {notifications.map((notif) => (
            <>
              <Paper key={notif.id}>
                <Typography variant="h6">{notif.title}</Typography>
                <Typography variant="body1">{notif.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notif.date}
                </Typography>
              </Paper>
              <Divider />
            </>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default Notifications;
